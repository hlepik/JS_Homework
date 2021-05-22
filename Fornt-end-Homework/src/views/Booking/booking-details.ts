import { HttpClient, IRouteViewModel } from "aurelia";
import { IBooking } from "../../domain/IBooking";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class ContactTypesDetail implements IRouteViewModel  {


    private service: BaseService<IBooking> =
        new BaseService<IBooking>("https://hlepik.azurewebsites.net/api/v1/Bookings", this.httpClient, this.state.token);


    private data: IBooking;

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
    }

    async load(parameters){
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        console.log(response);
        if (response.data) {
            this.data = response.data;
        }
        
    }
}
