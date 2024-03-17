import {
  Injectable,
} from '@nestjs/common'

import { Model } from 'mongoose'
import { CWLogger } from '../logger/cwlogger.service'
import { InjectModel } from '@nestjs/mongoose'
import { FeedBack, FeedbackDocument } from './feedback.schema'
import UserResponseDto from '../user/dto/user-response.dto'

@Injectable()
export class FeedbackService {
  @InjectModel(FeedBack.name) private readonly feedBackModel: Model<FeedbackDocument>
  private readonly logger: CWLogger = new CWLogger(FeedbackService.name)

  getModel(): Model<FeedbackDocument> {
    return this.feedBackModel
  }

  async create(data: FeedBack): Promise<FeedBack> {
    return this.feedBackModel.create(data)
  }

  async pagination(
    query?: Record<string, any>,
    select?: Record<string, number>,
    pagination?: {
      page: number,
      perPage: number
    },
    sort?: Record<string, number>,
  ): Promise<FeedBack[]> {
    const {
      page = 1,
      perPage = 20,
    } = pagination
    return this
      .feedBackModel
      .find(query)
      .select(select || {})
      .skip((page - 1) * (+perPage))
      .limit(+perPage)
      .sort(sort || { createdAt: -1 })
      .lean()
  }

}
