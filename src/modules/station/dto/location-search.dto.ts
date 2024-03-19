import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'

export default class LocationSearchDto {
  @ApiProperty({
  })
  @IsNumber()
  lat: number

  @ApiProperty({
  })
  @IsNumber()
  long: number
}
