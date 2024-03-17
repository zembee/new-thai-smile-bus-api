import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

class ErrorMessage {
  @ApiProperty({
    type: Number,
    required: true,
    example: 400,
  })
  @IsNumber()
  statusCode: number

  @ApiProperty({
    type: String,
    required: true,
    example: 'Something is wrong',
  })
  @IsString()
  message: string

  @ApiProperty({
    type: Object,
    required: false,
    example: {
      data: {},
    },
  })
  @IsOptional()
  data?: object
}

export default ErrorMessage
