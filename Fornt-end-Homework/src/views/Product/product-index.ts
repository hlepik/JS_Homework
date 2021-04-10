
import { BaseService } from '../../services/base-service';
import { IProduct } from "../../domain/IProduct";
import { HttpClient } from "aurelia";

export class ProductIndex {

    private service: BaseService<IProduct> = 
        new BaseService<IProduct>("https://localhost:5001/api/v1/Product", this.httpClient);

    
    private data: IProduct[] = [];

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
