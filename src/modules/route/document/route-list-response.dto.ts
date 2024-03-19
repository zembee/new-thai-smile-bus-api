import { ApiProperty } from '@nestjs/swagger'

export default class RouteListResponseDto {
  @ApiProperty({
    example: '6'
  })
  name: string

  @ApiProperty({
    example: " Bus No. 6 (AC) (พระประแดง - บางลำพู)",
  })
  description: string

  @ApiProperty({
    example: 'CR6OpovLw4_McOrH7DswS',
  })
  objectId: string
}
