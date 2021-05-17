export interface IUserBookedProducts {
    id?: string;
    until: Date;
    timeBooked: Date;
    productId: string;
    appUserId: string;
    description: string;
    email: string;
    bookingId: string;
}