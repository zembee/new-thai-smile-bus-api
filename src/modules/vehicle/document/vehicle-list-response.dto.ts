import { ApiProperty } from '@nestjs/swagger'

export default class VehicleListResponseDto {
  @ApiProperty({
    description: 'records',
    example: [
      [
        {
          'route': null,
          'registerNumber': null,
          'brand': 'MINE BUS',
          'motorNumber': 'MCS20111163',
          'chassisNumber': 'MRSBCREM5MZM00016',
          'number': null,
          'name': '',
          'objectId': 'r1pIhbmfViqsl5XNAlm8v',
        },
        {
          'route': null,
          'registerNumber': null,
          'brand': 'MINE BUS',
          'motorNumber': 'MCS20111180',
          'chassisNumber': 'MRSBCREM0MZM00005',
          'number': null,
          'name': '',
          'objectId': 'ONe40Szd3yp7eqS09Q6wR',
        },
      ],
    ],
  })
  records: Record<string, any>[]

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
    description: 'จำนวนข้อมููลทั้งหมด',
    required: true,
    example: 20,
  })
  count: number
}
