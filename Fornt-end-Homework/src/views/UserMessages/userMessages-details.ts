import { HttpClient, IRouteViewModel } from "aurelia";
import { IUserMessages } from "../../domain/IUserMessages";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class UserMessagesDetail implements IRouteViewModel  {


    private service: BaseService<IUserMessages> =
        new BaseService<IUserMessages>("https://hlepik.azurewebsites.net/UserMessages", this.httpClient, this.state.token);


    private data: IUserMessages;

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

