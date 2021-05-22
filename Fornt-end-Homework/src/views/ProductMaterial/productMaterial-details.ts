import { HttpClient, IRouteViewModel } from "aurelia";
import { IProductMaterial } from "../../domain/IProductMaterial";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class ProductMaterialDetail implements IRouteViewModel  {


    private service: BaseService<IProductMaterial> =
        new BaseService<IProductMaterial >("https://hlepik.azurewebsites.net/api/v1/ProductMaterial", this.httpClient, this.state.token);


    private data: IProductMaterial;

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

