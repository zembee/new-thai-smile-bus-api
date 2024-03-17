import { ApiProperty } from '@nestjs/swagger'

export default class RouteStationResponseDto {
  @ApiProperty({
    description: 'objectId',
    required: true,
    example: '8aWgy2mSufJquQzIysk2j',
  })
  objectId: string

  @ApiProperty({
    description: 'type',
    required: true,
    example: 'go',
  })
  type: string

  @ApiProperty({
    description: 'name',
    required: true,
    example: '39',
  })
  name: string

  @ApiProperty({
    description: 'Bus No. 39 (บางขันธ์ - อนุสาวรีย์ชัยสมรภูมิ)',
    required: true,
    example: '200',
  })
  description: string
}
