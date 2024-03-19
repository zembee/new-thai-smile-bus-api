import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsNotEmpty, ValidateNested } from 'class-validator'

export default class LocationDto {
  @ApiProperty({
    example: 'Point',
    description: 'ชนิด',
  })
  @IsNotEmpty()
  @IsIn(['Point'])
  type: string

  @ApiProperty({
    example: 'Point',
    description: 'ชนิด',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: number[]
}
