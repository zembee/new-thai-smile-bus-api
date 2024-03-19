import { ApiProperty } from '@nestjs/swagger'

export default class FeedbackListResponseDto {
  @ApiProperty({
    description: 'records',
    example: [
      {
        "objectId": "1234",
        "title": "หัวข้อ 1234",
        "status": "active",
        "description": "รายระเอียด.....",
        "startDate": "2021-12-06T05:55:30.803Z",
        "endDate": "2021-12-06T05:55:30.803Z",
        "questions": [
          {
            "type": "star",
            "question": "คำถาม 1",
            "index": 1,
            "choices": [
              {
                "value": 1
              },
              {
                "value": 2
              },
              {
                "value": 3
              },
              {
                "value": 4
              },
              {
                "value": 5
              }
            ]
          },
          {
            "type": "choice",
            "question": "คำถาม 2",
            "index": 2,
            "choices": [
              {
                "value": "คำตอบ 1"
              },
              {
                "value": "คำตอบ 2"
              }
            ]
          },
          {
            "type": "freeText",
            "question": "คำถาม 3",
            "index": 3,
            "choices": []
          }
        ],
        "answers": [
          {
            "createdAt": "2021-12-06T05:55:30.803Z",
            "user": "1234",
            "answers": [
              {
                "value": 1,
                "questionIndex": 1
              }
            ]
          }
        ],
        "createdBy": "",
        "updatedBy": ""
      }
    ],
  })
  records: Record<string, any>[]

  @ApiProperty({
    description: 'page',
    required: true,
    example: 1,
  })
  page: number

  @ApiProperty({
    description: 'perPage',
    required: true,
    example: 20,
  })
  perPage: number

  @ApiProperty({
    description: 'จำนวนข้อมูล',
    required: true,
    example: 100,
  })
  count: number
}
