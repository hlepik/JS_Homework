
import { BaseService } from '../../services/base-service';
import { IMessageForm } from "../../domain/IMessageForm";
import { HttpClient } from "aurelia";

export class MessageFormIndex {

    private service: BaseService<IMessageForm> = 
        new BaseService<IMessageForm>("https://hlepik.azurewebsites.net/MessageForm", this.httpClient);

    
    private data: IMessageForm[] = [];

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
