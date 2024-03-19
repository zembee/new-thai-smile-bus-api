import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'

export default class StationDto {
  @ApiProperty({
    example: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  index: number

  @ApiProperty({
    example: 'czPpng17MA4yDN58xr2u3',
  })
  @IsNotEmpty()
  @IsString()
  objectId: string

  @ApiProperty({
    enum: ['go', 'return'],
  })
  @IsNotEmpty()
  @IsEnum(['go', 'return'])
  @IsString()
  type: string
}
