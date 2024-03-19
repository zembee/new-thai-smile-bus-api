import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export default class StationLinearDto {
    @ApiProperty({
        description: 'objectId station',
        required: false,
        example: 'BwJT_SXJqRAAyd9pMR9jK',
      })
    @IsString()
    station: string
  
    @ApiProperty({
        description: 'objectId route',
        required: false,
        example: 'H4Va7R47kia_WEqKdJt-O',
      })
    @IsString()
    route: string
  }
  