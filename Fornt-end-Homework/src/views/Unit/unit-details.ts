import { HttpClient, IRouteViewModel } from "aurelia";
import { IUnit } from "../../domain/IUnit";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class UnitDetail implements IRouteViewModel  {


    private service: BaseService<IUnit> =
        new BaseService<IUnit>("https://hlepik.azurewebsites.net/api/v1/Unit", this.httpClient, this.state.token);


    private data: IUnit;

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
