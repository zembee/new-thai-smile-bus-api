import { ApiProperty } from '@nestjs/swagger'
import { AnnouncementDto } from './announcement.dto'

export default class PaginationAnnouncementResponseDto {
  @ApiProperty({
    example: 1,
  })
  page: number

  @ApiProperty({
    example: 20,
  })
  perPage: number

  @ApiProperty({
    example: 100,
  })
  count: number

  @ApiProperty({
    example: [{
      '_id': '60e7c8d498192c9f7ad15db6',
      'image': 'tbs1-07.png',
      'title': 'ตอบโจทย์ยุค 4.0',
      'subtitle': 'สังคมไทย ไร้เงินสด ไม่ต้องวุ่นวายพกเหรียญให้หนักกระเป๋า THAI SMILE BUS มีเทคโนโลยีช่วยตอบโจทย์ เครื่องอ่านบัตรสำหรับการรองรับการชำระเงิน แบบอิเล็กทรอนิกส์บนรถบัสโดยสารทุกคัน',
      'objectId': 'DtncfIXBUhEYm20Qq2CER',
      'createdAt': new Date('2021-07-09T03:56:04.624Z'),
      'updatedAt': new Date('2021-07-09T03:56:04.624Z'),
    }],
  })
  records: AnnouncementDto[]
}
