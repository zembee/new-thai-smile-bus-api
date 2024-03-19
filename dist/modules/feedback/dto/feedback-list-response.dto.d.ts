export default class FeedbackListResponseDto {
    records: Record<string, any>[];
    page: number;
    perPage: number;
    count: number;
}
