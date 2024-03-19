import { AnnouncementDto } from './announcement.dto';
export default class PaginationAnnouncementResponseDto {
    page: number;
    perPage: number;
    count: number;
    records: AnnouncementDto[];
}
