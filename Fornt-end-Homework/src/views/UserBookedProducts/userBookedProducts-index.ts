
import { BaseService } from '../../services/base-service';
import { IUserBookedProducts } from "../../domain/IUserBookedProducts";
import { HttpClient } from "aurelia";

export class UserBookedProductsIndex {

    private service: BaseService<IUserBookedProducts> = 
        new BaseService<IUserBookedProducts>("https://hlepik.azurewebsites.net/api/v1/UserBookedProducts", this.httpClient);

    
    private data: IUserBookedProducts[] = [];

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
