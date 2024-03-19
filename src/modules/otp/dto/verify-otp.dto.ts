import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
} from 'class-validator'

export default class VerifyOtpDto {
  @ApiProperty({
    example: 'asf13fz',
  })
  @IsString()
  @IsNotEmpty()
  verifyCode: string

  @ApiProperty({
    example: '111111',
  })
  @IsString()
  @IsNotEmpty()
  verifyNumber: string
}
