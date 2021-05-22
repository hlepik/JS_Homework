
import { BaseService } from '../../services/base-service';
import { IProduct } from "../../domain/IProduct";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";


export class ProductIndex {

    private service: BaseService<IProduct> = 
        new BaseService<IProduct>("https://hlepik.azurewebsites.net/api/v1/Products", this.httpClient, this.state.token);

    
    private data: IProduct[] = [];


    constructor(protected httpClient: HttpClient, private state: AppState){

    }

    async attached() {
        console.log("attached");

        let response = await this.service.getAll();
    
        if (response.data) {
        
            this.data = response.data;
            
        }
    }
}
