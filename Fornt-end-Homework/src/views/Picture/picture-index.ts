
import { BaseService } from '../../services/base-service';
import { IPicture } from "../../domain/IPicture";
import { HttpClient } from "aurelia";

export class PictureIndex {

    private service: BaseService<IPicture> = 
        new BaseService<IPicture>("https://localhost:5001/api/v1/Picture", this.httpClient);

    
    private data: IPicture[] = [];

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
