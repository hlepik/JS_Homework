
import { BaseService } from '../../services/base-service';
import { ICategory } from "../../domain/ICategory";
import { HttpClient } from "aurelia";

export class CategoryIndex {

    private service: BaseService<ICategory> = 
        new BaseService<ICategory>("https://hlepik.azurewebsites.net/api/v1/Categories", this.httpClient);

    
    private data: ICategory[] = [];

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