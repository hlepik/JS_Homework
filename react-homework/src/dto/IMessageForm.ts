export interface IMessageForm {
    id?: string;
    subject: string;
    message: string;
    email: string;
    dateSent?: Date;
    senderId?: string;
}