
import { BaseService } from '../../services/base-service';
import { IProductMaterial } from "../../domain/IProductMaterial";
import { HttpClient } from "aurelia";

export class ProductMaterialIndex {

    private service: BaseService<IProductMaterial> = 
        new BaseService<IProductMaterial>("https://hlepik.azurewebsites.net/api/v1/ProductMaterial", this.httpClient);

    
    private data: IProductMaterial[] = [];

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
