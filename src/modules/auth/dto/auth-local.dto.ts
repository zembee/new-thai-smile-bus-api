import { ApiProperty } from '@nestjs/swagger'

export class AuthLocalDto {
  @ApiProperty({
    description: 'phoneNumber or Email',
    required: true,
    example: '0628250294',
  })
  username?: string

  @ApiProperty({
    description: 'password',
    required: true,
    example: '123456789',
  })
  password?: string
}
