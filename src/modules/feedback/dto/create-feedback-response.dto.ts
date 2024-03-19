import { ApiProperty } from '@nestjs/swagger'

export default class CreateFeedbackResponseDto {
  @ApiProperty({
    example: 'หัวข้อ 1234',
  })
  title: string

  @ApiProperty({
    example: 'active',
  })
  status: string

  @ApiProperty({
    example: 'รายระเอียด.....',
  })
  description: string

  @ApiProperty({
    example: new Date(),
  })
  startDate: string

  @ApiProperty({
    example: new Date(),
  })
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
  questions: {
    type: 'star' | 'choice' | 'freeText'
    index: number,
    choices: {
      value: string | number
    }[]
  }[]

  @ApiProperty({
    example: [
      {
        createdAt: new Date(),
        user: '1234',
        answers: [{
          value: 1,
          questionIndex: 1,
        }]
      }
    ],
  })
  answers: {
    createdAt: Date,
    user: string,
    answers: {
      value: string | number,
      questionIndex: number,
    }[]
  }[]

  @ApiProperty({
    example: '',
  })
  createdBy?: string

  @ApiProperty({
    example: '',
  })
  updatedBy?: string
}
