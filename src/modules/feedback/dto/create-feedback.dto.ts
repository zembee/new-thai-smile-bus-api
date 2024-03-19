import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsObject, IsString } from 'class-validator'

export default class CreateFeedbackDto {
  @ApiProperty({
    example: 'หัวข้อ 1234',
  })
  @IsString()
  title: string

  @ApiProperty({
    example: 'รายระเอียด.....',
  })
  @IsString()
  description: string

  @ApiProperty({
    example: '2021-10-01T00:00:00+07:00',
  })
  @IsDateString()
  startDate: string

  @ApiProperty({
    example: '2021-10-01T00:00:00+07:00',
  })
  @IsDateString()
  endDate: string

  @ApiProperty({
    example: [
      {
        type: 'star',
        question: 'คำถาม 1',
        index: 1,
        choices: [
          {
            value: 1,
          },
          {
            value: 2,
          },
          {
            value: 3,
          },
          {
            value: 4,
          },
          {
            value: 5,
          },
        ],
      },
      {
        type: 'choice',
        question: 'คำถาม 2',
        index: 2,
        choices: [
          {
            value: 'คำตอบ 1',
          },
          {
            value: 'คำตอบ 2',
          },
        ],
      },
      {
        type: 'freeText',
        question: 'คำถาม 3',
        index: 3,
        choices: [],
      },
    ],
  })
  @IsObject()
  questions: {
    type: 'star' | 'choice' | 'freeText'
    index: number,
    choices: {
      value: string | number
    }[]
  }[]
}
