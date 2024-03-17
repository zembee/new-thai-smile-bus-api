import {
  BadRequestException,
  Body,
  Controller,
  Get, HttpCode,
  Inject, Param, Post, Put, Query, SetMetadata,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation, ApiParam,
} from '@nestjs/swagger'
import { CommonResponse } from '../../decorators/common-response.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { FeedbackService } from './feedback-service'
import CreateFeedbackResponseDto from './dto/create-feedback-response.dto'
import { IUser } from '../user/user.schema'
import { User } from '../user/users.decorator'
import CreateFeedbackDto from './dto/create-feedback.dto'
import dayjs from 'dayjs'
import { FeedBack } from './feedback.schema'
import FeedbackListResponseDto from './dto/feedback-list-response.dto'
import FeedbackListDto from './dto/feedback-list.dto'
import UpdateFeedbackResponseDto from './dto/update-feedback-response.dto'
import PaginationAnnouncementDto from '../announcement/dto/pagination-announcement.dto'

const Module = 'Feedback'


@UseGuards(JwtAuthGuard)
@Controller('feedback')
export class FeedbackController {
  @Inject() private readonly feedbackService: FeedbackService

  @Get('')
  @ApiOperation({ 'summary': 'รายการ feedback' })
  @SetMetadata('skipAuth', true)
  @CommonResponse(Module, { successType: FeedbackListResponseDto })
  async feedbackList(
    @User() user: IUser,
    @Query() query: PaginationAnnouncementDto,
  ): Promise<FeedbackListResponseDto> {
    const {
      page = 1,
      perPage = 20,
    } = query

    const [records, count] = await Promise.all([
      this.feedbackService
        .getModel()
        .findOne({ status: 'active' })
        .sort({ createdAt: -1 })
        .limit(1),
      // this.feedbackService.pagination(
      //   {
      //     startDate: {
      //       $lte: new Date(),
      //     },
      //     endDate: {
      //       $gte: new Date(),
      //     },
      //   },
      //   { _id: 0, answers: 0 },
      //   {
      //     page,
      //     perPage,
      //   },
      // ),
      this.feedbackService.getModel().countDocuments({
        startDate: {
          $lte: new Date(),
        },
        endDate: {
          $gte: new Date(),
        },
      }),
    ])

    return {
      records: [records],
      count,
      page,
      perPage,
    }
  }

  @Put('/:objectId/:userNames')
  @ApiOperation({ 'summary': 'ตอบคำถาม' })
  @SetMetadata('skipAuth', true)
  @CommonResponse(Module, { successType: CreateFeedbackResponseDto })
  @ApiParam({ type: String, name: 'objectId' })
  @ApiParam({ type: String, name: 'userNames' })
  async updateFeedback(
    @User() user: IUser,
    @Body() body: UpdateFeedbackResponseDto,
    @Param('objectId') objectId: string,
    @Param('userNames') userNames: string,
  ): Promise<any> {
    const {
      answers,
    } = body

    const feedback = await this.feedbackService.getModel().findOne({ objectId }).lean()
    if (!feedback) {
      throw new BadRequestException({
        message: 'feedback not exists.',
      })
    }

    await this.feedbackService.getModel().updateOne({ objectId }, {
      $push: {
        answers: {
          //user: user?.objectId ?? 'guest',
          user: userNames ?? 'guest',
          createdAt: new Date(),
          answers,
        },
      },
    })

    return answers
  }

}
