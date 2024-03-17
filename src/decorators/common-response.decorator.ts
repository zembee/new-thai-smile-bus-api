import { applyDecorators } from '@nestjs/common'
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import ErrorMessage from '../dto/error-message.dto'

export function CommonResponse(tag: string, { successType }) {
  return applyDecorators(
    ApiTags(tag),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: successType,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: ErrorMessage,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: ErrorMessage,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Error',
      type: ErrorMessage,
    }),
  )
}
