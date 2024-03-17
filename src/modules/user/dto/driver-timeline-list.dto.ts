import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export default class DriverTimelineListDto {
  @ApiProperty({
    example: 1625017951,
    description: 'startDate',
  })
  @Type(() => Number)
  @IsNumber()
  startDate: number

  @ApiProperty({
    example: 1625017951,
    description: 'endDate',
  })
  @Type(() => Number)
  @IsNumber()
  endDate: number
}
