import { HttpClient, IRouteViewModel } from "aurelia";
import { IProduct } from "../../domain/IProduct";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class ProductEdit implements IRouteViewModel  {


    private service: BaseService<IProduct> =
        new BaseService<IProduct>("https://localhost:5001/api/v1/Products", this.httpClient, this.state.token);


    private data: IProduct;

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

