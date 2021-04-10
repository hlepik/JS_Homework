
import { BaseService } from '../../services/base-service';
import { IUnit } from "../../domain/IUnit";
import { HttpClient } from "aurelia";

export class UnitIndex {

    private service: BaseService<IUnit> = 
        new BaseService<IUnit>("https://localhost:5001/api/v1/Unit", this.httpClient);

    
    private data: IUnit[] = [];

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
