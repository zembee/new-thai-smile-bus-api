import { Model } from 'mongoose';
import { Announcement } from './announcement.schema';
import { AnnouncementDto } from './dto/announcement.dto';
export declare class AnnouncementService {
    private AnnouncementModel;
    private readonly logger;
    constructor(AnnouncementModel: Model<Announcement>);
    getModel(): Model<Announcement>;
    pagination(query?: {
        page: number;
        perPage: number;
    }, select?: Record<string, number>): Promise<{
        records: AnnouncementDto[];
        count: number;
    }>;
}
