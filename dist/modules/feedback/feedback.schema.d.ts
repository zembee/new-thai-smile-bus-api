import mongoose, { Document } from 'mongoose';
export declare type FeedbackDocument = FeedBack & Document;
export declare class FeedBack {
    objectId?: string;
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    createdBy?: string;
    updatedBy?: string;
    status?: string;
    questions?: {
        type: 'star' | 'choice' | 'freeText';
        index: number;
        choices: {
            value: string | number;
        }[];
    }[];
    answers?: {
        createdAt: Date;
        user: string;
        answers: {
            value: string | number;
            questionIndex: number;
        }[];
    }[];
}
export declare const FeedBackSchema: mongoose.Schema<mongoose.Document<FeedBack, any>, mongoose.Model<any, any, any>, undefined>;
