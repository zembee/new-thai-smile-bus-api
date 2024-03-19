import { Model } from 'mongoose';
import { FeedBack, FeedbackDocument } from './feedback.schema';
export declare class FeedbackService {
    private readonly feedBackModel;
    private readonly logger;
    getModel(): Model<FeedbackDocument>;
    create(data: FeedBack): Promise<FeedBack>;
    pagination(query?: Record<string, any>, select?: Record<string, number>, pagination?: {
        page: number;
        perPage: number;
    }, sort?: Record<string, number>): Promise<FeedBack[]>;
}
