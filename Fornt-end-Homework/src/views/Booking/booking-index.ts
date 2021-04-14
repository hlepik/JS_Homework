import { BaseService } from '../../services/base-service';
import { IBooking } from "../../domain/IBooking";
import { HttpClient } from "aurelia";

export class BookingIndex {
    private service: BaseService<IBooking> = 
        new BaseService<IBooking>("https://localhost:5001/api/v1/Bookings", this.httpClient);

    
    private data: IBooking[] = [];

    constructor(protected httpClient: HttpClient){

    }

    async attached() {
        console.log("attached");
        let response = await this.service.getAll();
        if (response.data) {
            this.data = response.data;
        }
    }
}
