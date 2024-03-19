import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { FeedbackService } from './feedback-service'
import { FeedbackController } from './feedback-controller'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
  ],
  exports: [
    FeedbackService,
  ],
})
export class FeedbackModule {
}
