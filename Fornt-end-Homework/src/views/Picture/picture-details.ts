import { HttpClient, IRouteViewModel } from "aurelia";
import { IPicture } from "../../domain/IPicture";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class PictureDetail implements IRouteViewModel  {


    private service: BaseService<IPicture> =
        new BaseService<IPicture>("https://localhost:5001/api/v1/Picture", this.httpClient, this.state.token);


    private data: IPicture;

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

