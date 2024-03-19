import { ApiProperty } from '@nestjs/swagger'
import LocationResponseDto from './location-response.dto'

export default class StationResponseDto {
  @ApiProperty({
    example: 'r-SQWiihXS1ATbXYbVdmk',
    description: 'objectId',
  })
  objectId: string

  @ApiProperty({
    example: 'ป้ายรถประจำทาง ตรงข้ามธนาคารกสิกรไทยราษฎร์บูรณะ 32/2',
    description: 'ชื่อป้าย',
  })
  name: string

  @ApiProperty({
    example: 'ตรงข้ามธนาคารกสิกรไทยราษฎร์บูรณะ32/2,ตรงข้ามธนาคารกสิกรไทย,ถนนราษฎร์บูรณะ เขตราษฎร์บูรณะ แขวงราษฎร์บูรณะ กรุงเทพมหานคร 10140',
    description: 'รายระเอียด',
  })
  description: string

  @ApiProperty({
    example: {
      'type': 'Point',
      'coordinates': [
        100.513886,
        13.677417,
      ],
    },
    description: 'ตำแหน่งที่ตั้ง',
  })
  location: LocationResponseDto
}
