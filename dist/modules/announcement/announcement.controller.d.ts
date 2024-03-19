import PaginationAnnouncementDto from './dto/pagination-announcement.dto';
import PaginationAnnouncementResponseDto from './dto/pagination-announcement-response.dto';
export declare class AnnouncementController {
    private readonly announcementService;
    announcementPagination(query: PaginationAnnouncementDto): Promise<PaginationAnnouncementResponseDto>;
}
