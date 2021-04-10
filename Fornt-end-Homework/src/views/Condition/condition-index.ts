
import { BaseService } from '../../services/base-service';
import { ICondition } from "../../domain/ICondition";
import { HttpClient } from "aurelia";

export class ConditionIndex {

    private service: BaseService<ICondition> = 
        new BaseService<ICondition>("https://localhost:5001/api/v1/Condition", this.httpClient);

    
    private data: ICondition[] = [];

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
