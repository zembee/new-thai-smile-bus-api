import { ApiProperty } from '@nestjs/swagger'

export default class OtpEmailResponseDto {
  @ApiProperty({
    example: '123aaqwe',
  })
  verifyCode: string

  @ApiProperty({
    example: 'asasf@Adasd.com',
  })
  email: string
}
