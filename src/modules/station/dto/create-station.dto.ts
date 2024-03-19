import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import LocationDto from './location.dto'
import { Type } from 'class-transformer'

export default class CreateStationDto {
  @ApiProperty({
    example: 'ป้ายรถประจำทาง ไอคอนสยาม',
    description: 'ชื่อ',
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    example: 'ป้ายรถประจำทาง ไอคอนสยาม',
    description: 'รายระเอียด',
  })
  @IsOptional()
  @IsString()
  description: string

  @ApiProperty({
    example: {
      'type': 'Point',
      'coordinates': [
        100.509187,
        13.726264,
      ],
    },
    description: 'ตำแหน่ง',
  })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto
}
