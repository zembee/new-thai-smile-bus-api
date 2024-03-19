import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import LocationDto from './location.dto'
import LocationSearchDto from './location-search.dto'
import { Type } from 'class-transformer'

export default class StationListDto {
  @ApiProperty({
    description: 'หาจากชื่อป้าย / รายระเอียด',
    required: false,
    example: '',
  })
  @IsOptional()
  @IsString()
  search: string

  @ApiProperty({
    description: 'หาจากตำแหน่ง (lat)',
    required: false,
    example: 10.003,
  })
  @IsOptional()
  @Type(() => Number)
  lat: number

  @ApiProperty({
    description: 'หาจากตำแหน่ง (long)',
    required: false,
    example: 10.003,
  })
  @IsOptional()
  @Type(() => Number)
  long: number

  @ApiProperty({
    description: 'จำนวนป้ายที่ต้องการ',
    required: false,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  quantity: number

  @ApiProperty({
    description: 'รัศมี ใกล้สุด x เมตร',
    required: false,
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minRadius: number

  @ApiProperty({
    description: 'รัศมี ไกลสุด x เมตร',
    required: false,
    example: 5000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxRadius: number
}
