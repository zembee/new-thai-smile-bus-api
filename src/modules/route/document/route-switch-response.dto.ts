import { ApiProperty } from '@nestjs/swagger'

export default class RouteSwitchResponseDto {
    @ApiProperty({
      description: 'stations',
      required: true,
      example: '8aWgy2mSufJquQzIysk2j',
    })
    stations: string
  
  
    @ApiProperty({
      description: 'routes',
      required: true,
      example: ['8aWgy2mSufJquQzIysk2j','czPpng17MA4yDN58xr2u3'],
    })
    routes: string[]
  
  }