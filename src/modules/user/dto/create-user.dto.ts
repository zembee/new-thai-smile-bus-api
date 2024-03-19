import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export default class CreateUserDto {
  @ApiProperty({
    example: '0632441234',
  })
  @IsOptional()
  @IsString()
  phoneNumber: string

  @ApiProperty({
    example: 'abc@thaibusmile.com',
  })
  @IsOptional()
  @IsString()
  email: string

  @ApiProperty({
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({
    example: 'tony',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @ApiProperty({
    example: 'woodsome',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiProperty({
    example: '1jai2',
  })
  @IsNotEmpty()
  @IsString()
  verifyCode?: string

  appleId?: string
  googleId?: string
  facebookId?: string
}
