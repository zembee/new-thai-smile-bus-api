export default class UpdateFeedbackResponseDto {
    answers: {
        value: string | number;
        questionIndex: number;
    }[];
}
