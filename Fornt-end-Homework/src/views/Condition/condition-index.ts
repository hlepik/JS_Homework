
import { BaseService } from '../../services/base-service';
import { ICondition } from "../../domain/ICondition";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";

export class ConditionIndex {

    private service: BaseService<ICondition> = 
        new BaseService<ICondition>("https://hlepik.azurewebsites.net/api/v1/Conditions", this.httpClient, this.state.token);

    
    private data: ICondition[] = [];

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
