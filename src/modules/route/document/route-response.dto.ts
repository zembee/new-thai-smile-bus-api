import { ApiProperty } from '@nestjs/swagger'
import StationsInterface from '../interface/stations.interface'

export default class RouteResponseDto {
  @ApiProperty({
    example: '8aWgy2mSufJquQzIysk2j',
  })
  objectId: string

  @ApiProperty({
    example: '120',
  })
  name: string

  @ApiProperty({
    example: 'Bus No. 120 (มหาชัยเมืองใหม่ - คลองสาน)',
  })
  description: string

  @ApiProperty({
    example: 'active',
  })
  status: string

  @ApiProperty({
    example: [{
      online: 10,
      offline: 2,
    }],
  })
  bus: { online: number, offline: number }

  @ApiProperty({
    example: [{
      online: 18,
      offline: 1,
    }],
  })
  employee: { online: number, offline: number }

  @ApiProperty({
    example: [{
      index: 0,
      name: 'ป้ายรถประจำทาง ตรงข้ามซอยพระราชวิริยาภรณ์ 16',
      location: {
        type: 'Point',
        coordinates: [
          100.521831,
          13.667928,
        ],
      },
      type: 'go',
      objectId: 'czPpng17MA4yDN58xr2u3',
    }],
  })
  stations: StationsInterface[]
}
