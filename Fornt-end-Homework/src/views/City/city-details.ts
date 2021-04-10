import { HttpClient, IRouteViewModel } from "aurelia";
import { ICity } from "../../domain/ICity";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class CityDetail implements IRouteViewModel  {


    private service: BaseService<ICity> =
        new BaseService<ICity>("https://localhost:5001/api/v1/City", this.httpClient, this.state.token);


    private data: ICity;

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

