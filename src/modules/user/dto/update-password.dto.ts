import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export default class UpdatePasswordDto {
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
  oldPassword?: string
}
