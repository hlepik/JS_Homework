import { HttpClient, IRouteViewModel } from "aurelia";
import { IMessageForm } from "../../domain/IMessageForm";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class MessageFormDetail implements IRouteViewModel  {


    private service: BaseService<IMessageForm> =
        new BaseService<IMessageForm>("https://localhost:5001/api/v1/MessageForm", this.httpClient, this.state.token);


    private data: IMessageForm;

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

