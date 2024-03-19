import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  Model,
  Promise,
} from 'mongoose'
import { Announcement } from './announcement.schema'
import { CWLogger } from '../logger/cwlogger.service'
import { AnnouncementDto } from './dto/announcement.dto'

@Injectable()
export class AnnouncementService {
  private readonly logger: CWLogger = new CWLogger(AnnouncementService.name)

  constructor(
    @InjectModel(Announcement.name) private AnnouncementModel: Model<Announcement>,
  ) {
  }

  public getModel(): Model<Announcement> {
    return this.AnnouncementModel
  }

  public async pagination(
    query = {
      page: 1,
      perPage: 20,
    },
    select: Record<string, number> = {},
  ): Promise<{ records: AnnouncementDto[], count: number }> {
    const { page, perPage } = query
    try {
      const pCount = this.AnnouncementModel
        .countDocuments({
          endDate : {
            $gte: new Date()
          }
        })
      const pRecord = this.AnnouncementModel
        .find({
          endDate : {
            $gte: new Date()
          }
        })
        .select(select)
        .sort({ createdAt: -1 })
        .skip((page - 1) * (+perPage))
        .limit(+perPage)
        .lean()
      const [records, count] = await Promise.all([pRecord, pCount])
      return {
        records,
        count,
      }
    } catch (e) {
      this.logger.error(`pagination cat on  ${e.message ?? e}`)
      throw new InternalServerErrorException({ message: e.message ?? e })
    }
  }
}
