
import { BaseService } from '../../services/base-service';
import { IPictureEdit } from "../../domain/IPictureEdit";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";

export class PictureIndex {

    private service: BaseService<IPictureEdit> = 
        new BaseService<IPictureEdit>("https://hlepik.azurewebsites.net/api/v1/Pictures", this.httpClient, this.state.token);

    
    private data: IPictureEdit[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState){

    }

    async attached() {
        console.log("attached");

        let response = await this.service.getAll();
        if (response.data) {
            this.data = response.data;
        }
    }
}
