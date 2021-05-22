import { HttpClient, IRouteViewModel } from "aurelia";
import { IUserBookedProducts } from "../../domain/IUserBookedProducts";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class UserBookedProductsDetail implements IRouteViewModel  {


    private service: BaseService<IUserBookedProducts> =
        new BaseService<IUserBookedProducts>("https://hlepik.azurewebsites.net/UserBookedProducts", this.httpClient, this.state.token);


    private data: IUserBookedProducts;

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

