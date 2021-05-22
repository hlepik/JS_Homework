
import { BaseService } from '../../services/base-service';
import { IUserMessages } from "../../domain/IUserMessages";
import { HttpClient } from "aurelia";

export class UserMessagesIndex {

    private service: BaseService<IUserMessages> = 
        new BaseService<IUserMessages>("https://hlepik.azurewebsites.net/api/v1/UserMessages", this.httpClient);

    
    private data: IUserMessages[] = [];

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
