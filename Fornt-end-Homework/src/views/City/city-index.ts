
import { BaseService } from '../../services/base-service';
import { ICity } from "../../domain/ICity";
import { HttpClient } from "aurelia";

export class CityIndex {

    private service: BaseService<ICity> = 
        new BaseService<ICity>("https://localhost:5001/api/v1/City", this.httpClient);

    
    private data: ICity[] = [];

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
