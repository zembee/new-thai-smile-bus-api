import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import LocationDto from './location.dto'
import { Type } from 'class-transformer'

export default class UpdateStationDto {
  @ApiProperty({
    example: 'active',
    description: 'แก้ไขสถานะ',
  })
  @IsNotEmpty()
  @IsIn(['active', 'disabled'])
  status: string

  @ApiProperty({
    example: 'ป้ายรถประจำทาง ไอคอนสยาม',
    description: 'แก้ไขชื่อ',
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    example: 'ป้ายรถประจำทาง ไอคอนสยาม',
    description: 'แก้ไขรายระเอียด',
  })
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
    description: 'แก้ไขตำแหน่ง',
  })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto
}
