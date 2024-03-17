import { ApiProperty } from '@nestjs/swagger'

export default class LocationResponseDto {
  @ApiProperty({
    example: 'Point',
    description: 'ปนะเภทของตำแหน่ง',
  })
  type: string

  @ApiProperty({
    example: [
      100.513886,
      13.677417,
    ],
    description: 'ตำแหน่งที่ตั้ง [long,lat]',
  })
  coordinates: number[]
}
