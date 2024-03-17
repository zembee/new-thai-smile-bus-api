import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../app/app.module'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import xlsx from 'xlsx'
import { StationModule } from './station.module'
import { StationService } from './station.service'
import { Station } from './station.schema'
import uniqBy from 'lodash/uniqBy'
import groupBy from 'lodash/groupBy'
import pickBy from 'lodash/pickBy'

describe('StationService', () => {
  let service: StationService
  process.env.NODE_ENV = '1'
  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature(models, DB_CONNECTION_NAME),
        StationModule,
      ],
      providers: [
        StationService,
      ],
    }).compile()

    service = module.get<StationService>(StationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('init master data', async() => {
    const sheet = xlsx.readFile(require('path').resolve('./') + '/src/static/master-data.xlsx')
    const masterData: any = xlsx.utils.sheet_to_json(sheet.Sheets[sheet.SheetNames[3]])
    const stations: Station[] = masterData.map(data => {
      return {
        name: data.ST_NAME,
        description: data.ST_DESC,
        location: {
          type: 'Point',
          coordinates: [data.ST_LONG, data.ST_LAT],
        },
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'superadmin@tsb.com',
        updatedBy: null,
      }
    })
    const uniqStation = uniqBy(stations, (elem) => {
      return elem.location.coordinates.join()
    })
    const dupp = groupBy(uniqStation, 'name')
    const duppp = pickBy(dupp, x => x.length > 1)
    console.log(duppp)

    // const result = await service.getModel().insertMany(uniqStation)
    // expect(result.length).toEqual(995)
  })
})
