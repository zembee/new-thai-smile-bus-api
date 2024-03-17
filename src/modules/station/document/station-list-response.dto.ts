import { ApiProperty } from '@nestjs/swagger'
import StationResponseDto from './station-response.dto'

export default class StationListResponseDto {
  @ApiProperty({
    description: 'records',
    example: [
      {
        "updateBy" : null,
        "createdBy" : "superadmin@tsb.com",
        "status" : "active",
        "name" : "ป้ายรถประจำทาง ตรงข้ามธนาคารกสิกรไทยราษฎร์บูรณะ 32/2",
        "description" : "ตรงข้ามธนาคารกสิกรไทยราษฎร์บูรณะ32/2,ตรงข้ามธนาคารกสิกรไทย,ถนนราษฎร์บูรณะ เขตราษฎร์บูรณะ แขวงราษฎร์บูรณะ กรุงเทพมหานคร 10140",
        "location" : {
          "type" : "Point",
          "coordinates" : [
            100.513886,
            13.677417
          ]
        },
        "createdAt" : new Date("2021-09-20T18:57:28.975Z"),
        "updatedAt" : new Date("2021-09-20T18:57:28.975Z"),
        "objectId" : "r-SQWiihXS1ATbXYbVdmk"
      },
    ],
  })
  records: StationResponseDto[]

  @ApiProperty({
    description: 'page',
    required: true,
    example: 1,
  })
  page: number

  @ApiProperty({
    description: 'perPage',
    required: true,
    example: 20,
  })
  perPage: number

  @ApiProperty({
    description: 'จำนวนข้อมูล',
    required: true,
    example: 100,
  })
  count: number
}
