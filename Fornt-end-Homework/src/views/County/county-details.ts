import { HttpClient, IRouteViewModel } from "aurelia";
import { ICounty } from "../../domain/ICounty";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class CountyDetail implements IRouteViewModel  {


    private service: BaseService<ICounty> =
        new BaseService<ICounty>("https://hlepik.azurewebsites.net/County", this.httpClient, this.state.token);


    private data: ICounty;

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

