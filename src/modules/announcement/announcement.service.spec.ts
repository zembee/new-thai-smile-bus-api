import { Test, TestingModule } from '@nestjs/testing'
import { AnnouncementService } from './announcement.service'
import { AppModule } from '../app/app.module'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { AnnouncementModule } from './announcement.module'

describe('AnnouncementService', () => {
  let service: AnnouncementService

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        AnnouncementModule,
        MongooseModule.forFeature(models, DB_CONNECTION_NAME),
      ],
    }).compile()

    service = module.get<AnnouncementService>(AnnouncementService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('test create announcement', async() => {
    const data = [
      {
        'image': 'tbs1-19.png',
        'title': '4 เหตุผลน่าใช้บริการ THAI SMILE BUS',
        'subtitle':
          'เพราะเรามุ่งมั่นสร้างความประทับใจให้กับผู้โดยสาร ด้วยการเดินทางที่ปลอดภัย มีประสิทธิภาพและ มาตรฐานด้านการบริการ',
      },
      {
        'image': 'tbs1-07.png',
        'title': 'ตอบโจทย์ยุค 4.0',
        'subtitle':
          'สังคมไทย ไร้เงินสด ไม่ต้องวุ่นวายพกเหรียญให้หนักกระเป๋า THAI SMILE BUS มีเทคโนโลยีช่วยตอบโจทย์ เครื่องอ่านบัตรสำหรับการรองรับการชำระเงิน แบบอิเล็กทรอนิกส์บนรถบัสโดยสารทุกคัน',
      },
    ]


    const actual = await service.getModel().create(data)
    expect(actual).toMatchObject(data)
  })
})
