import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export default class ResetPasswordDto {
  @ApiProperty({
    example: '0628250294 / absolute274@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({
    example: '1jai2',
  })
  @IsNotEmpty()
  @IsString()
  verifyCode?: string
}
