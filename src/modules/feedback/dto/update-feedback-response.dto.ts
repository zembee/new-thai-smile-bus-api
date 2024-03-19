import { ApiProperty } from '@nestjs/swagger'

export default class UpdateFeedbackResponseDto {
  @ApiProperty({
    example: [{
      value: 1,
      questionIndex: 1,
    }]
  })
  answers: {
    value: string | number,
    questionIndex: number,
  }[]
}
