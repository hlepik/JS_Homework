
import { BaseService } from '../../services/base-service';
import { IResult } from "../../domain/IResult";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";


export class ResultIndex {

    private service: BaseService<IResult> = 
        new BaseService<IResult>("https://localhost:5001/api/v1/Results", this.httpClient, this.state.token);

    
    private data: IResult[] = [];


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