import { Injectable } from '@nestjs/common'
import { Vehicle, VehicleDocument } from './vehicle.schema'
import { Model } from 'mongoose'
import { CWLogger } from '../logger/cwlogger.service'
import { InjectModel } from '@nestjs/mongoose'
import BusLocationInterface from './interfaces/bus-location.interface'

@Injectable()
export class VehicleService {
  @InjectModel(Vehicle.name) private readonly vehicleModel: Model<
    VehicleDocument
  >
  private readonly logger: CWLogger = new CWLogger(VehicleService.name)

  getModel(): Model<VehicleDocument> {
    return this.vehicleModel
  }

  async pagination(
    query?: Record<string, any>,
    select?: Record<string, number>,
    pagination?: {
      page: number
      perPage: number
    },
    sort?: Record<string, number>,
  ): Promise<Vehicle[]> {
    const { page = 1, perPage = 20 } = pagination
    return this.vehicleModel
      .find(query)
      .select(select || {})
      .skip((page - 1) * +perPage)
      .limit(+perPage)
      .sort(sort || { name: -1 })
      .lean()
  }

  async updateVehicleLocation(
    locations: BusLocationInterface[],
  ): Promise<Vehicle[]> {
    // TODO update driver to bus
    const busImei: string[] = []
    const updateBulkWriteLocation = locations.map(location => {
      busImei.push(location.imei)
      return {
        updateOne: {
          filter: {
            gpsUnitId: location.imei,
          },
          update: {
            speed: location.speed,
            latestActive: new Date(location.recv_utc_ts),
            engineStatus: location.engine_status,
            location: {
              type: 'Point',
              coordinates: [location.lon, location.lat],
            },
          },
        },
      }
    })

    await this.vehicleModel.bulkWrite(updateBulkWriteLocation)
    return this.vehicleModel
      .find(
        {
          gpsUnitId: { $in: busImei },
        },
        {
          objectId: 1,
          route: 1,
        },
      )
      .lean()
  }

  async getVehicleRouteRadius(
    objectId: string,
    lat: number,
    long: number,
    minRadius: number,
    maxRadius: number,
  ): Promise<any[]> {
    const vehicles = await this.vehicleModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [long, lat] },
          minDistance: minRadius,
          maxDistance: maxRadius,
          spherical: true,
          distanceField: 'distance',
        },
      },
      {
        $lookup: {
          from: 'route',
          localField: 'route',
          foreignField: 'objectId',
          as: 'route',
        },
      },
      {
        $unwind: '$route',
      },
      {
        $match: {
          // 'route.objectId': { $in: objectIds },
          'route.stations': {
            $elemMatch: { objectId },
          },
        },
      },
      {
        $project: {
          _id: 0,
          routeStatus: 1,
          engineStatus: 1,
          speed: 1,
          latestActive: 1,
          objectId: 1,
          location: 1,
          'route.objectId': 1,
          distance: 1,
          number: 1,
          name: 1,
          registerNumber: 1,
          'gpsDataReference.course': 1,
          'route.name': 1,
        },
      },
      {
        $sort: { 'route.objectId': 1, distance: 1 },
      },
    ])
    return vehicles
  }

  // new
  async getVehicleRouteRadius2<T>(
    objectId: string,
    lat: number,
    long: number,
    minRadius: number,
    maxRadius: number,
  ): Promise<T[]> {
    const vehicles = await this.vehicleModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [long, lat],
          },
          distanceField: 'distance',
          maxDistance: maxRadius,
          minDistance: minRadius,
          spherical: true,
        },
      },
      {
        $lookup: {
          from: 'route',
          localField: 'route',
          foreignField: 'objectId',
          as: 'routes',
        },
      },
      {
        $unwind: '$routes',
      },
      {
        $lookup: {
          from: 'station',
          localField: 'routes.stations.objectId',
          foreignField: 'objectId',
          as: 'routes.stationss',
        },
      },
      {
        $unwind: {
          path: '$routes.stations',
        },
      },
      {
        $unwind: {
          path: '$routes.stationss',
        },
      },
      {
        $redact: {
          $cond: [
            {
              $eq: ['$routes.stations.objectId', '$routes.stationss.objectId'],
            },
            '$$KEEP',
            '$$PRUNE',
          ],
        },
      },
      {
        $project: {
          _id: 0,
          routeStatus: 1,
          engineStatus: 1,
          speed: 1,
          latestActive: 1,
          objectId: 1,
          location: 1,
          distance: 1,
          number: 1,
          name: 1,
          registerNumber: 1,
          'gpsDataReference.course': 1,
          routes: {
            objectId: '$routes.objectId',
            name: '$routes.name',
            status: '$routes.status',
            description: '$routes.description',
            stations: {
              objectId: '$routes.stations.objectId',
              type: '$routes.stations.type',
              distanceDepot: '$routes.stations.distanceDepot',
              typeStation: '$routes.stations.typeStation',
              objectIds: '$routes.stationss.objectId',
              location: '$routes.stationss.location',
              name: '$routes.stationss.name',
              status: '$routes.stationss.status',
            },
          },
        },
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            routeStatus: '$routeStatus',
            engineStatus: '$engineStatus',
            speed: '$speed',
            latestActive: '$latestActive',
            objectId: '$objectId',
            location: '$location',
            distance: '$distance',
            number: '$number',
            name: '$name',
            registerNumber: '$registerNumber',
            gpsDataReference: {
              course: '$gpsDataReference.course',
            },
          },
          routes: {
            $push: '$routes',
          },
        },
      },
      {
        $project: {
          _id: '$_id._id',
          routeStatus: '$_id.routeStatus',
          engineStatus: '$_id.engineStatus',
          speed: '$_id.speed',
          latestActive: '$_id.latestActive',
          objectId: '$_id.objectId',
          location: '$_id.location',
          distance: '$_id.distance',
          number: '$_id.number',
          name: '$_id.name',
          registerNumber: '$_id.registerNumber',
          gpsDataReference: '$_id.gpsDataReference',
          routes: '$routes',
        },
      },
      {
        $match: {
          'routes.stations.status': 'active',
          'routes.stations.objectId': objectId,
        },
      },
      {
        $sort: {
          'routes.objectId': 1,
          distance: 1,
        },
      },
    ])

    return vehicles
  }

  //20230419
  async getVehicleRouteStationRadius<T>(
    objectId: string,
    lat: number,
    long: number,
    minRadius: number,
    maxRadius: number,
    objectIdRoute: string[],
  ): Promise<T[]> {


    // objectId =  'Jl_DBRol_rovjNXAGELqe' 
    // lat = 13.926241 
    // long = 100.462194
    // minRadius = 1 ; 
    // maxRadius = 10000 
    // objectIdRoute = ["x7vPrlezv2vc9c3-inof5"]


    const data = [objectId,lat,long,minRadius,maxRadius,objectIdRoute] ;
      console.log("data", data);

    const vehicles = await this.vehicleModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [long, lat],
          },
          distanceField: 'distance',
          maxDistance: maxRadius,
          minDistance: minRadius,
          spherical: true,
        },
      },
      {
        $lookup: {
          from: 'route',
          localField: 'route',
          foreignField: 'objectId',
          as: 'routes',
        },
      },
      {
        $unwind: '$routes',
      },
      {
        $lookup: {
          from: 'station',
          localField: 'routes.stations.objectId',
          foreignField: 'objectId',
          as: 'routes.stationss',
        },
      },
      {
        $unwind: {
          path: '$routes.stations',
        },
      },
      {
        $unwind: {
          path: '$routes.stationss',
        },
      },
      {
        $redact: {
          $cond: [
            {
              $eq: ['$routes.stations.objectId', '$routes.stationss.objectId'],
            },
            '$$KEEP',
            '$$PRUNE',
          ],
        },
      },
      {
        $project: {
          _id: 0,
          routeStatus: 1,
          engineStatus: 1,
          speed: 1,
          latestActive: 1,
          objectId: 1,
          location: 1,
          distance: 1,
          number: 1,
          name: 1,
          registerNumber: 1,
          'gpsDataReference.course': 1,
          routes: {
            objectId: '$routes.objectId',
            name: '$routes.name',
            status: '$routes.status',
            description: '$routes.description',
            stations: {
              objectId: '$routes.stations.objectId',
              type: '$routes.stations.type',
              distanceDepot: '$routes.stations.distanceDepot',
              typeStation: '$routes.stations.typeStation',
              objectIds: '$routes.stationss.objectId',
              location: '$routes.stationss.location',
              name: '$routes.stationss.name',
              status: '$routes.stationss.status',
            },
          },
        },
      },
      {
        $group: {
          _id: {
            _id: '$_id',
            routeStatus: '$routeStatus',
            engineStatus: '$engineStatus',
            speed: '$speed',
            latestActive: '$latestActive',
            objectId: '$objectId',
            location: '$location',
            distance: '$distance',
            number: '$number',
            name: '$name',
            registerNumber: '$registerNumber',
            gpsDataReference: {
              course: '$gpsDataReference.course',
            },
          },
          routes: {
            $push: '$routes',
          },
        },
      },
      {
        $project: {
          _id: '$_id._id',
          routeStatus: '$_id.routeStatus',
          engineStatus: '$_id.engineStatus',
          speed: '$_id.speed',
          latestActive: '$_id.latestActive',
          objectId: '$_id.objectId',
          location: '$_id.location',
          distance: '$_id.distance',
          number: '$_id.number',
          name: '$_id.name',
          registerNumber: '$_id.registerNumber',
          gpsDataReference: '$_id.gpsDataReference',
          routes: '$routes',
        },
      },
      {
        $match: {
          'routes.stations.status': 'active',
          'routes.stations.objectId': objectId,
          '$and': [
            {
              'routes.objectId': {
                '$exists': true, 
                '$in': objectIdRoute
              }
            }
          ]
        },
      },
      {
        $sort: {
          'routes.objectId': 1,
          distance: 1,
        },
      },
    ])

    return vehicles
  }

}
