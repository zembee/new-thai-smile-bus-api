import { IUser } from '../user/user.schema';
import FeedbackListResponseDto from './dto/feedback-list-response.dto';
import UpdateFeedbackResponseDto from './dto/update-feedback-response.dto';
import PaginationAnnouncementDto from '../announcement/dto/pagination-announcement.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    feedbackList(user: IUser, query: PaginationAnnouncementDto): Promise<FeedbackListResponseDto>;
    updateFeedback(user: IUser, body: UpdateFeedbackResponseDto, objectId: string, userNames: string): Promise<any>;
}
