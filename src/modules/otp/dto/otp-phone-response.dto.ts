import { ApiProperty } from '@nestjs/swagger'

export default class OtpPhoneResponseDto {
  @ApiProperty({
    example: '123aaqwe',
  })
  verifyCode: string

  @ApiProperty({
    example: 'asasf@Adasd.com',
  })
  phoneNumber: string
}
