export interface IUserMessages {
    id?: string;
    appUserId: string;
    subject: string;
    message: string;
    senderEmail: string;
    dateSent: Date;
}