import { Test, TestingModule } from '@nestjs/testing'
import { RouteService } from './route.service'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import { Route } from './route.schema'
import { AppModule } from '../app/app.module'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { RouteModule } from './route.module'
import os from 'os'
import admin from 'firebase-admin'
import xlsx from 'xlsx'
import { Station } from '../station/station.schema'
import uniqBy from 'lodash/uniqBy'
import { StationModule } from '../station/station.module'
import { StationService } from '../station/station.service'

describe('RouteService', () => {
  let service: RouteService
  let stationService: StationService
  jest.setTimeout(1000000)
  process.env.NODE_ENV = 'a'
  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature(models, DB_CONNECTION_NAME),
        RouteModule,
        StationModule,
      ],
      providers: [
        RouteService,
        StationService,
      ],
    }).compile()

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: 'thaismilebus-317007',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYA4pOxJmu7THN\n/EfM3Y6NshN5fMz8Ljt6w2rdMzLCcbTnV5Q83+jQZCyiZZTUE/AUBhD4zn4x8H6R\nerf/OKL7IoBTgrSXp3wSQJaN+S2x3RFm4PeGDaKaqW3LGr1cM7i7OSwyaG/lKCbe\nZ/hQUofzgTERxqVUtyIT30ym/izVHwlLorQFe3ilOxr+AxY9oKkt3tp4CCP+7MKw\nwrCBFixoPinB8Slav1bTm9wL7TIsuOGZQq5dbn/H46o88haURkSIsL3KDLwKy1MR\nbgyCfKl5k8S5TAB+vlRF0MWAb6zAfxxXzPRb8PeLItmchX3Ph5EEIrlYc9IE8Z/d\nwgZ42ze5AgMBAAECggEAAhFLQmjBY9wRSTlREy/gwlvdkLGSOqxYzgHGLHHHsxYX\nlS1vZFgRyzLPmhpaWLuYMHeIJ9AsLnr0R7+E7OVc7yBAIVKl6Omj4f4rpgzxcom8\nlLsC1tmM4IBlMEXh9TT1YmODzsA1pGbkR3Jf0dzbgUP8sj6SzVkLzzwiZ2ON4cyr\nxdSHZanDKciCsecUQ0lX/Oei4GyEVpBbMjGuXl6znjqrYvODRQ5aiPNzIXdAvfoq\noVGcZLojKdCoe8FZrWgY9Vpxk6naOc7dgRMOs6C4TnHy2pcM0PlsNq44Y6KPvYLG\npEgLmtzgPYdIh2QbQJwn/0IEHQMizo3zhYUHsXGSkQKBgQDLylD2Z+E1CEp7LRk1\n5T6octBTLr/YK3CYvP3YHVJGLRdPJRpxOmI5BPEF6uG+EuNiDLpYXO8gL7ZtvPfW\n8lqYnwy8+Nzln7wtjyEO78xvzCUnuxvgf/GJ9nsOfmMNntUen3HSTF4obz/WlGqP\nywxOC0FEBGx/hPo7Rk23Qsj4iQKBgQC+9XCMjrryW/Ka4wk0fx+wdam/z5PTUuid\nGoo0BtY/Wo2Z7D3d+xCENpCtljfx+Hk9yP1zhaPqLjdq+pYk2XM7M7rImn8HKN68\naYxYhngY478oanPuKOCf6zGm0q0OiwZRImK0YMiqKOlZf+YwHkicyCARe7vXatG2\nYRZoIhIZsQKBgFaR21LRThn5K6qnvc3nVHa6T0UG1vg9e9dmcW8dBZZKEVzNpi3z\nX0ZZkwmwfbUA0RcV0RM4Z1yE6Do1zBLDYTj0V7TvAueIs6em5aQyueXEEwSNt4nm\nz/SLgDrn9awTjPU1RmTPjDAhEj1VTu9GkjOVFGSQfIavNp13gAwZksYBAoGBAJmc\n950adGjibpcKbC0+1k8tWBBk+5XT7Cv1XZfcqBzuy1o3IM2hWfgBrQD3BqowJ9f8\nB2cW6nVIGGyGiKG8C2Zkhq05G1a3GfaXMb9E7PeYvf3VJM1BNPFwUdDRSUWZsMsz\nzhMsiD/aCV1l9dZfhioZEzL9Rm5UD7+W+l9qiQUBAoGAdz8dVAo+xAIPIdPdGlXz\nhrxLarmSYl/O59UwxRfUqRdQjSo26CVP6iZx0sjp9tbWlz9Yt/XGTEbuxKDFGZrY\nC3IW0uUp83kdzuAy4M4JqVBBdRYW+dMfIFzcKnq7sEeFia7i/EmwpyV2Zn5dGMpM\nh3npHkQ0L0YWCH6PYurF/OM=\n-----END PRIVATE KEY-----\n',
        clientEmail: 'firebase-adminsdk-qrsqi@thaismilebus-317007.iam.gserviceaccount.com',
      }),
    })

    service = module.get<RouteService>(RouteService)
    stationService = module.get<StationService>(StationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // it('init master route data', async() => {
  //   const sheet = xlsx.readFile(require('path').resolve('./') + '/src/static/master-data.xlsx')
  //   const masterData: any = xlsx.utils.sheet_to_json(sheet.Sheets[sheet.SheetNames[2]])
  //   const routes: Route[] = masterData.map(data => {
  //     return {
  //       name: data.RT_NAME,
  //       description: data.RT_DESC,
  //       type: data.RT_TYPE,
  //       status: 'active',
  //       createdBy: 'superadmin@tsb.com',
  //       updatedBy: null,
  //     }
  //   })
  //   const result = await service.getModel().insertMany(uniqBy(routes, 'name'))
  //   expect(result.length).toEqual(10)
  // })

  it('init route stations master data', async() => {
    const sheet = xlsx.readFile(require('path').resolve('./') + '/src/static/master-data.xlsx')
    const masterDataRoute: any = xlsx.utils.sheet_to_json(sheet.Sheets[sheet.SheetNames[2]])
    const masterDataStations: any = xlsx.utils.sheet_to_json(sheet.Sheets[sheet.SheetNames[3]])
    const routes: Route[] = await Promise.all(masterDataRoute.map(async data => {
      let goIndex = 0
      let returnIndex = 0
      const masterStation = masterDataStations.filter(ms => ms.RT_ID === data.RT_ID)
      const station = []
      for (const ms of masterStation) {
        const st = await stationService.getModel().findOne({ 'location.coordinates': [ms.ST_LONG, ms.ST_LAT] }).lean()
        // console.log(ms.ST_ID)
        if (['go', 'GO', 'Go', 'gO'].includes(ms.ST_TYPE)) {
          goIndex++
          station.push({
            objectId: st.objectId,
            type: 'go',
            index: goIndex - 1,
          })
        } else {
          returnIndex++
          station.push({
            objectId: st.objectId,
            type: 'return',
            index: returnIndex - 1,
          })
        }
      }
      return {
        name: data.RT_NAME,
        description: data.RT_DESC,
        type: data.RT_TYPE,
        status: 'active',
        createdBy: 'superadmin@tsb.com',
        updatedBy: null,
        stations: station,
      }
    }))
    const result = await service.getModel().insertMany(uniqBy(routes, 'name'))
    expect(result.length).toEqual(10)
  })

  it('send notification', async() => {
    const registrationToken = 'cVNL69T_Tx-ijt1qzdN3Et:APA91bH0eqAGii9qm1EI0lVBZbBLQQVrowYnpIYlsGv_YvX4DWPeBKSIscXMoilnTBv_v2AbRkGt0hSUiHnZCCRlj0IF14RwIcaRoIqo5iKtGDfKtYekcc9A47TEAlMDR4Pe4DzVsDEO'
    const payload = {
      notification: {
        title: 'BUS 999',
        body: '999 ถึงปลายทางแล้ว',
      },
    }

    const send = await admin.messaging().sendToDevice([registrationToken], payload)
    console.log(JSON.stringify(send, null, 2))
  })
})
