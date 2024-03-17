import { ApiProperty } from '@nestjs/swagger'

export default class StationLinearResponseDto {
    @ApiProperty({
      example: 'r-SQWiihXS1ATbXYbVdmk',
      description: 'objectId station',
    })
    objectId: string
  
    @ApiProperty({
      example: '17',
      description: 'ตำแหน่งป้าย',
    })
    index: string

    @ApiProperty({
      example: 'ปตท.LPGและน้ำมัน (ตรงข้ามหมู่บ้านเกาหลีรามอินทรา)',
      description: 'ชื่อป้าย',
    })
    name: string

    @ApiProperty({
      example: 'return',
      description: 'ประเภทป้าย',
    })
    type: string

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
    location: string
  }