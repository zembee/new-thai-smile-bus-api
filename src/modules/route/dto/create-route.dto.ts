import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import StationDto from './station.dto'

export default class CreateRouteDto {
  @ApiProperty({
    example: '120',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: '',
  })
  @IsOptional()
  @IsString()
  description: string

  @ApiProperty({
    example: [
      {
        index: 0,
        objectId: 'czPpng17MA4yDN58xr2u3',
        type: 'go',
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StationDto)
  stations: StationDto[]
}
