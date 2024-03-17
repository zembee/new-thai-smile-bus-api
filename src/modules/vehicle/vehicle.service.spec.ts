import { Test, TestingModule } from '@nestjs/testing'
import { VehicleService } from './vehicle.service'
import { AppModule } from '../app/app.module'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { UserService } from '../user/user.service'
import { VehicleGateway } from './vehicle.gateway'
import { VehicleModule } from './vehicle.module'
import xlsx from 'xlsx'
import { Vehicle } from './vehicle.schema'
import { DepotService } from '../depot/depot.service'
import { DepotModule } from '../depot/depot.module'

describe('BusService', () => {
  let service: VehicleService
  let userService: UserService
  let busGateWay: VehicleGateway
  let depotService: DepotService
  jest.setTimeout(5000000)
  process.env.NODE_ENV = '1'
  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature(models, DB_CONNECTION_NAME),
        VehicleModule,
        DepotModule,
      ],
      providers: [
        VehicleService,
        DepotService,
        VehicleGateway,
      ],
    }).compile()

    service = module.get<VehicleService>(VehicleService)
    userService = module.get<UserService>(UserService)
    busGateWay = module.get<VehicleGateway>(VehicleGateway)
    depotService = module.get<DepotService>(DepotService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(userService).toBeDefined()
  })


  it('init master data', async() => {
    const sheet = xlsx.readFile(require('path').resolve('./') + '/src/static/master-data.xlsx')
    const masterDataDepot: any = xlsx.utils.sheet_to_json(sheet.Sheets[sheet.SheetNames[0]])
    const masterDataVehicle: any = xlsx.utils.sheet_to_json(sheet.Sheets[sheet.SheetNames[4]])
    const vehicle: Vehicle[] = []
    for (const data of masterDataVehicle) {
      const depotName = masterDataDepot.find(md => md.DEP_ID === data.DEP_ID)?.DEP_NAME ?? null
      const depot = await depotService.getModel().findOne({ name: depotName }).lean()
      vehicle.push({
        type: 'bus',
        gpsUnitId: null,
        name: '',
        chassisNumber: data.VC_CHASSIS_NUM,
        motorNumber: data.VC_MOTER_NUM,
        brand: data.VC_BRAND,
        addressInstall: data.VC_ADD_INSTALL,
        registerNumber: null,
        number: null,
        status: 'active',
        depot: depot?.objectId ?? null,
        createdBy: 'superadmin@tsb.com'
      })
    }

    const result = await service.getModel().insertMany(vehicle)
    expect(result.length).toEqual(48)
  })
})

// it('create driver', async() => {
//
//   const user = {
//     'status': 'active',
//     'roles': [
//       'user',
//     ],
//     'latestLogin': new Date(),
//     'token': null,
//     'email': 'absolute274@gmail.com',
//     'phoneNumber': '0628250294',
//     'password': '$2b$10$LAYsF2pzvHOw5wbIDu.r2eAgmkzsXUb10BSVEUyyJgHim5tebq3oC',
//     'firstName': 'tony',
//     'lastName': 'woodsome',
//     'objectId': 'RgViHBPBCA4RZCAiLOel0',
//   }
//
//   await userService.getModel().create(user)
//
//   const driverUpdateData = {
//     licenseNumber: '22009',
//     identityNumber: '3341123424243',
//     birthDate: new Date(),
//   }
//
//   const { licenseNumber, identityNumber, birthDate } = driverUpdateData
//
//   const updateToDriver = await userService.updateRoleToDriver('RgViHBPBCA4RZCAiLOel0', licenseNumber, identityNumber, birthDate)
//   expect(updateToDriver.nModified).toEqual(1)
// })
//
// it('update location from hook', async() => {
//   const hookdata = {
//     'vendor_id': 33,
//     'locations_count': 2,
//     'locations': [
//       {
//         'utc_ts': '2021-06-19T07:47:40.000Z',
//         'ext_power_status': 1,
//         'alt': 0,
//         'recv_utc_ts': '2021-06-19T07:47:42.000Z',
//         'engine_status': 1,
//         'lon': 100.53817,
//         'hdop': 1,
//         'num_sats': 21,
//         'speed': 0,
//         'gpsdata_id': 86034000,
//         'driver_track1': '',
//         'driver_track3': '',
//         'driver_track2': '',
//         'fix': 1,
//         'imei': '864606042991116',
//         'course': 0,
//         'seq': 0,
//         'lat': 13.793255,
//       },
//       {
//         'utc_ts': '2021-06-19T07:47:44.000Z',
//         'ext_power_status': 1,
//         'alt': 0,
//         'recv_utc_ts': '2021-06-19T07:47:45.000Z',
//         'engine_status': 1,
//         'lon': 100.5382,
//         'hdop': 1,
//         'num_sats': 10,
//         'speed': 0,
//         'gpsdata_id': 86034020,
//         'driver_track1': '',
//         'driver_track3': '',
//         'driver_track2': '',
//         'fix': 1,
//         'imei': '864606048472038',
//         'course': 0,
//         'seq': 0,
//         'lat': 13.793283,
//       }],
//   }
//   const actual = await service.updateBusLocation(hookdata.locations)
//   console.log(actual)
//   const bus = await service.getModel().find()
// })
//
// it('test send socket data', () => {
//   return busGateWay.emit('location', 'hello')
// })
//
// it('test axios', async() => {
//   const headers = {
//     'Content-Type': 'Application/json',
//     'Accept-Charset': 'UTF8',
//     'Authorization': 'Basic VFNCMDE6VFNCMTIzNCE=',
//   }
//
//   const data = {
//     'SENDER': 'TSB Go',
//     'TELNO': '0628250294',
//     'MESSAGE': 'hello',
//     'REFNO': '2f2rz99s',
//     'REMARK': '',
//   }
//
//   const url = 'https://tvdr-service.tvdirect.tv/ApiPartnerSMS-Test/Partner/SendSMS'
//
//   await axios.post(url, data, { headers })
// })
//
// it('test date', async() => {
//   console.log(new Date(1625017951 * 1000))
// })

