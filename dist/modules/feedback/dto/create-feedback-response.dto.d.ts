export default class CreateFeedbackResponseDto {
    title: string;
    status: string;
    description: string;
    startDate: string;
    endDate: string;
    questions: {
        type: 'star' | 'choice' | 'freeText';
        index: number;
        choices: {
            value: string | number;
        }[];
    }[];
    answers: {
        createdAt: Date;
        user: string;
        answers: {
            value: string | number;
            questionIndex: number;
        }[];
    }[];
    createdBy?: string;
    updatedBy?: string;
}
