import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsOptional, IsString } from 'class-validator'

export default class UpdateVehicleDto {
  @ApiProperty({
    required: true,
    example: 'active',
  })
  @IsIn(['active', 'disabled'])
  status: string

  @ApiProperty({
    required: true,
    enum: ['bus', 'taxi', 'van'],
  })
  @IsIn(['bus', 'taxi', 'van'])
  type: string

  @ApiProperty({
    required: false,
    example: 'รถ1',
  })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({
    required: false,
    example: 'A-1',
  })
  @IsOptional()
  @IsString()
  number: string

  @ApiProperty({
    required: false,
    example: 'MRSBCREM3MZM00001',
  })
  @IsOptional()
  @IsString()
  chassisNumber?: string

  @ApiProperty({
    required: false,
    example: 'MCS20111175',
  })
  @IsOptional()
  @IsString()
  motorNumber?: string

  @ApiProperty({
    required: false,
    example: 'MINE BUS',
  })
  @IsOptional()
  @IsString()
  brand?: string

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  @IsString()
  addressInstall?: string

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  @IsString()
  registerNumber?: string

  @ApiProperty({
    required: false,
    example: '',
  })
  @IsOptional()
  @IsString()
  gpsUnitId?: string

  @ApiProperty({
    required: false,
    example: '3SeAbgzxaNTH8-G7jFI-c',
  })
  @IsOptional()
  @IsString()
  route?: string
}
