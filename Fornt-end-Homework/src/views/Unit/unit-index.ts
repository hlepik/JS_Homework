
import { BaseService } from '../../services/base-service';
import { IUnit } from "../../domain/IUnit";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";

export class UnitIndex {

    private service: BaseService<IUnit> = 
        new BaseService<IUnit>("https://hlepik.azurewebsites.net/api/v1/Units", this.httpClient,  this.state.token);

    
    private data: IUnit[] = [];

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
