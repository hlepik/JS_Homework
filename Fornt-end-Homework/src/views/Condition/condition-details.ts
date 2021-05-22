import { HttpClient, IRouteViewModel } from "aurelia";
import { ICondition } from "../../domain/ICondition";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class ConditionDetail implements IRouteViewModel  {


    private service: BaseService<ICondition> =
        new BaseService<ICondition>("https://hlepik.azurewebsites.net/Condition", this.httpClient, this.state.token);


    private data: ICondition;

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
    }

    async load(parameters){
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        console.log(response);
        if (response.data) {
            this.data = response.data;
        }
        
    }
}

