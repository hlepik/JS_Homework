
import { BaseService } from '../../services/base-service';
import { IAnswer } from "../../domain/IAnswer";
import { HttpClient, IRouter, Router} from "aurelia";
import { AppState } from "../../state/app-state";


export class AnswerIndex {

    private service: BaseService<IAnswer> = 
        new BaseService<IAnswer>("https://localhost:5001/api/v1/Answers", this.httpClient, this.state.token);

    
    private data: IAnswer[] = [];


    constructor(protected httpClient: HttpClient, @IRouter private router: Router, private state: AppState){

    }

    async attached() {
        console.log("attached");

        let response = await this.service.getAll();
    
        if (response.data) {
        
            this.data = response.data;
            
        }
    }
    async delete(event: Event, id: string){ 
        event.preventDefault();
        event.stopPropagation();

        let response = await this.service.delete(id);
        console.log(response)

        if (response.statusCode >= 200 && response.statusCode < 400) {

            this.data = this.data.filter(item => item.id != id);
            }

    }
}