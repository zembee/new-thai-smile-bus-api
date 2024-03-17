import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export default class UpdateUserDto {
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
    example: 'tony',
  })
  @IsOptional()
  @IsString()
  firstName: string

  @ApiProperty({
    example: 'woodsome',
  })
  @IsOptional()
  @IsString()
  lastName: string

  @ApiProperty({
    example: '',
  })
  @IsOptional()
  @IsString()
  imgProfile: string
}
