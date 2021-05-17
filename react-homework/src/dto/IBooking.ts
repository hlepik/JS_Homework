export interface IBooking {
    id?: string;
    timeBooked: Date;
    until: Date;
    productId: string;
    appUserId: string;
}