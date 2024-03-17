import { ApiProperty } from '@nestjs/swagger'
import RouteResponseDto from '../../route/document/route-response.dto'

export default class VehicleResponseDto {
  @ApiProperty({
    description: 'เลขรถ',
    example: 'A-1',
  })
  number: string

  @ApiProperty({
    description: 'เลขทะเบียน',
    example: 'กข062347',
  })
  registerNumber: string

  @ApiProperty({
    description: 'คัสซี',
    example: 'MRSBCREM3MZM00001',
  })
  chassisNumber: string

  @ApiProperty({
    description: 'เครื่องยนต์',
    example: 'MCS20111175',
  })
  motorNumber: string

  @ApiProperty({
    description: 'จำนวนผู้โดยสาร',
    example: 10,
  })
  passengerCount: number

  @ApiProperty({
    description: 'เชื่อมต่อวายฟาย',
    example: 5,
  })
  wifiConnectCount: number

  @ApiProperty({
    description: 'พนักงาน',
    example: '',
  })
  employee: Record<string, any>

  @ApiProperty({
    description: 'ความเร็วของรถ',
    example: 120,
  })
  speed: number

  @ApiProperty({
    description: 'วันที่อัพเดท gps ล่าสุด UTC',
    example: new Date(),
  })
  latestActive: Date

  @ApiProperty({
    description: 'สายรถ',
    example: '6',
  })
  route: RouteResponseDto

  @ApiProperty({
    description: 'objectId',
    example: '76mVcq5830o-aqsBy3oOm',
  })
  objectId: string

  @ApiProperty({
    description: 'location',
    example: {
      type: 'Point',
      coordinates: [
        100.521831,
        13.667928,
      ],
    },
  })
  location: Record<string, any>

  status?: string
}
