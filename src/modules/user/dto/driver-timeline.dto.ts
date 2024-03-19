import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsString,
} from 'class-validator'

export default class DriverTimelineDto {
  @ApiProperty({
    example: 'check-in',
    enum: ['check-in', 'check-out'],
    description: 'action check-in or check-out'
  })
  @IsString()
  @IsEnum(['check-in', 'check-out'])
  action: string

  @ApiProperty({
    example: 'check-in',
    enum: ['go', 'return'],
  })
  @IsString()
  @IsEnum(['go', 'return'])
  status: string

  @ApiProperty({
    example: 'iaCSIjS8SIpSbcfeGCkxwIFF',
    description: 'busObjectId',
  })
  @IsString()
  bus: string
}
