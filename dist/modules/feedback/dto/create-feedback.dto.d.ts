export default class CreateFeedbackDto {
    title: string;
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
}
