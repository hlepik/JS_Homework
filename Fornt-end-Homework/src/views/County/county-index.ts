
import { BaseService } from '../../services/base-service';
import { ICounty } from "../../domain/ICounty";
import { HttpClient } from "aurelia";

export class CountyIndex {

    private service: BaseService<ICounty> = 
        new BaseService<ICounty>("https://hlepik.azurewebsites.net/api/v1/Counties", this.httpClient);

    
    private data: ICounty[] = [];

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
