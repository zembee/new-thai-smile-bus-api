import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { OnGatewayDisconnect } from '@nestjs/websockets/interfaces/hooks/on-gateway-disconnect.interface'
import { OnGatewayConnection } from '@nestjs/websockets/interfaces/hooks/on-gateway-connection.interface'
import { OnGatewayInit } from '@nestjs/websockets/interfaces/hooks/on-gateway-init.interface'
import { Socket } from 'socket.io'
import { CWLogger } from '../logger/cwlogger.service'
import { IUser } from '../user/user.schema'
import { User } from '../user/users.decorator'
import { Inject, UseGuards } from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { SchedulerRegistry } from '@nestjs/schedule'

@WebSocketGateway({ path: '/ws/vehicle' })
export class VehicleGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: CWLogger = new CWLogger(VehicleGateway.name)
  @WebSocketServer() private server: any
  @Inject() private readonly vehicleService: VehicleService
  @Inject() private schedulerRegistry: SchedulerRegistry

  @SubscribeMessage('vehicle:location')
  async subscribeVehicleLocationEvent(
    @ConnectedSocket() client: Socket,
    @User() user: IUser,
    @MessageBody() type: string,
    
  ): Promise<void> {
    this.join(client, type)
    this.logger.log(
      `username ${user?.phoneNumber ??
        user?.email} join vehicle:location ${type}`,
    )
  }

  @SubscribeMessage('vehicle:route')
  async subscribeVehicleRouteRadius(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomNo: string
      objectId: string
      lats: string
      lons: string
      minRadius: number
      maxRadius: number
      intervalTime: number
    },
  ): Promise<void> {
    this.join(client, data.roomNo)

    try {
      const _scheduler:boolean = this.schedulerRegistry.doesExists('interval', client.id);
      if (_scheduler) {
        this.schedulerRegistry.deleteInterval(client.id)
      }
    } catch (error) {
      this.logger.error(error)
    }

    const dataVehicles = async () => {
      const vehicles = await this.vehicleService.getVehicleRouteRadius(
        data.objectId,
        parseFloat(data.lats),
        parseFloat(data.lons),
        data.minRadius,
        data.maxRadius,
      )

      this.emit('vehicle:route', data.roomNo, vehicles)
    }

    dataVehicles()
    if (typeof data.intervalTime === 'number') {
      const interval = setInterval(dataVehicles, data.intervalTime)
      this.schedulerRegistry.addInterval(client.id, interval)
    }
  }

  // new
  @SubscribeMessage('vehicle:routetransport')
  async subscribeVehicleRouteRadius2(
    @ConnectedSocket() client: Socket,
    routeArray : string[],
    @MessageBody()
    data: {
      roomNo: string
      objectId: string
      lats: string
      lons: string
      minRadius: number
      maxRadius: number
      intervalTime: number,
      objectIdRoute:string[]
    },
  ): Promise<void> {
    interface IDistance {
      lat1: number
      lon1: number
      lat2: number
      lon2: number
    }

    interface IDistanceStation {
      lats: number
      lons: number
      data: IResponse[]
    }

    interface IResponse {
      gpsDataReference: { course: number }
      routeStatus?: string | boolean
      engineStatus: boolean
      speed: number
      latestActive: Date
      routes?: [
        {
          name: string
          objectId: string
          status: string
          stations: {
            distanceDepot: number
            location: {
              coordinates: [number, number]
              type: string
            }
            name: string
            objectId: string
            status: string
            type: string
            typeStation: string
          }
          description: string
          calculateDistance?: {
            vehicleId?: string
            distance?: number
            station?: number
          }
        },
      ]
      route?: {
        name: string
        objectId: string
        description: string
        vehicle: { travelTime: number }
      }
      registerNumber: string
      number: string
      name: string
      objectId: string
      location: { type: string; coordinates: [number, number] }
      distance: number
    }

    this.join(client, data.roomNo)
    
    try {
      const _scheduler:boolean = this.schedulerRegistry.doesExists('interval', client.id);
      if (_scheduler) {
        this.schedulerRegistry.deleteInterval(client.id)
      }
    } catch (error) {
      this.logger.error(error)
    }
    
    const dataVehicles = async () => {
      // const vehicles = await this.vehicleService.getVehicleRouteRadius2<
      //   IResponse
      // >(
      //   data.objectId,
      //   parseFloat(data.lats),
      //   parseFloat(data.lons),
      //   data.minRadius,
      //   data.maxRadius,
      // )
      //20230419
      if(!Array.isArray(data.objectIdRoute)){
        routeArray = Array(data.objectIdRoute);
      }else{
        routeArray =data.objectIdRoute;
      }

      const vehicles = await this.vehicleService.getVehicleRouteStationRadius<
        IResponse
      >(
        data.objectId,
        parseFloat(data.lats),
        parseFloat(data.lons),
        data.minRadius,
        data.maxRadius,
        //data.objectIdRoute,
        routeArray,
      )

      
\

      const params: IDistanceStation = {
        lats: parseFloat(data.lats),
        lons: parseFloat(data.lons),
        data: vehicles,
      }
      
   

      const result = distance_station(params)
      result.map(item => {
        // const speedPerHour = 40
        const speedPerHour = item.speed > 20 ? item.speed : 20
        const distancePerHour = item.distance / 1000
        // const distancePerSecond = (distancePerHour / speedPerHour) * 3600;
        const time = Math.floor((distancePerHour / speedPerHour) * 60)

        const route = item.routes.find(item => item)
        item.route = {
          name: route.name,
          objectId: route.objectId,
          description: route.description,
          vehicle: { travelTime: time > 0 ? time : 1 },
        }
        delete item.routes
      })

      result.sort(
        (a, b) =>
          a.route.objectId == b.route.objectId && a.distance - b.distance,
      )

      this.emit('vehicle:routetransport', data.roomNo, result)
    }
    const distance_station = (params: IDistanceStation): IResponse[] => {

      const vehicles = params.data.filter(items => {
        const stations = items.routes
          .filter(item => item.stations.typeStation == 'Depot')
          .map(item => {
            const station_lat = item.stations.location.coordinates[1]
            const station_long = item.stations.location.coordinates[0]
            const data: IDistance = {
              lat2: items.location.coordinates[1],
              lon2: items.location.coordinates[0],
              lat1: station_lat,
              lon1: station_long,
            }
            const distances_km = distances(data)
            const distanceDepot = item.stations.distanceDepot

            item.calculateDistance = {
              distance: distances_km,
              station: distanceDepot,
            }

            return item
          })
          .find(item => {
            // const station_lat = item.stations.location.coordinates[1]
            // const station_long = item.stations.location.coordinates[0]
            // const data: IDistance = {
            //   lat2: items.location.coordinates[1],
            //   lon2: items.location.coordinates[0],
            //   lat1: station_lat,
            //   lon1: station_long,
            // }
            // const distances_km = distances(data)
            // const distanceDepot = item.stations.distanceDepot

            const distances_km = item.calculateDistance.distance
            const distanceDepot = item.calculateDistance.station
            return distances_km < distanceDepot
          })

        return stations
      })

      return params.data.filter(
        item => !vehicles.some(i => i.objectId === item.objectId),
      )
    }

    const distances = (data: IDistance): number => {
      // http://www.movable-type.co.uk/scripts/latlong.html
      // φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
      // note that angles need to be in radians to pass to trig functions!

      const R = 6371e3
      const φ1 = (data.lat1 * Math.PI) / 180
      const φ2 = (data.lat2 * Math.PI) / 180
      const Δφ = ((data.lat2 - data.lat1) * Math.PI) / 180
      const Δλ = ((data.lon2 - data.lon1) * Math.PI) / 180
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const d = R * c // in metres
      return d // returns the distance in meter
    }

    dataVehicles()
    if (typeof data.intervalTime === 'number') {
      const interval = setInterval(dataVehicles, data.intervalTime)
      this.schedulerRegistry.addInterval(client.id, interval)
    }
  }

  join(client: Socket, objectId: string): void {
    client.leaveAll()
    client.join(objectId)
  }

  emit(event: string, roomNo: string, message: any): void {
    this.logger.log(`emit socket event ${event}`)
    this.server.to(roomNo).emit(event, message)
  }

  afterInit(): void {
    this.logger.log(`Bus Gateway Sockets Initialized ...`)
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client Connected. ${client.id}`)
  }

  handleDisconnect(client: Socket): void {
    try {
      if (this.schedulerRegistry.doesExists('interval', client.id)) {
        this.logger.log(`Client Disconnected. ${client.id}`)
        this.schedulerRegistry.deleteInterval(client.id)
      }
    } catch (error) {
      this.logger.error(error)
    }
  }
}