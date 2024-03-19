import { ApiProperty } from '@nestjs/swagger'

export default class UserResponseDto {
  @ApiProperty({
    example: 'y_kR4zSxF03mA3o4oInJZ',
  })
  objectId?: string

  @ApiProperty({
    example: '0632441234',
  })
  phoneNumber?: string

  @ApiProperty({
    example: 'abc@thaibusmile.com',
  })
  email?: string


  @ApiProperty({
    example: ['user', 'driver', 'admin', 'superAdmin', 'master'],
  })
  roles: string[]

  @ApiProperty({
    example: 'tony',
  })
  firstName?: string

  @ApiProperty({
    example: 'woodsome',
  })
  lastName?: string

  @ApiProperty({
    example: new Date(),
  })
  lastLogin?: Date


  appleId?: string
  googleId?: string
  facebookId?: string
}

