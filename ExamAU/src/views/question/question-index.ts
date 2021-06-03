
import { BaseService } from '../../services/base-service';
import { IQuestion } from "../../domain/IQuestion";
import { HttpClient, IRouter, Router} from "aurelia";
import { AppState } from "../../state/app-state";


export class QuestionIndex {

    private service: BaseService<IQuestion> = 
        new BaseService<IQuestion>("https://localhost:5001/api/v1/Questions", this.httpClient, this.state.token);

    
    private data: IQuestion[] = [];


    constructor(protected httpClient: HttpClient, @IRouter private router: Router, private state: AppState){

    }

    async attached() {
        console.log("attached");

        let response = await this.service.getAll();
    
        if (response.data) {
   
            this.data = response.data;
            console.log(this.data)
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