import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export default class RouteDestinationDto {
  @ApiProperty({
    type: String
  })
  @IsNotEmpty()
  origin: string

  @ApiProperty({
    type: String
  })
  @IsNotEmpty()
  destination: string
}
