
import { BaseService } from '../../services/base-service';
import { AppState } from "../../state/app-state";
import { IQuiz } from '../../domain/IQuiz';
import { HttpClient, IRouter, Router} from "aurelia";

export class QuizIndex {

    private service: BaseService<IQuiz> = 
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quizzes", this.httpClient, this.state.token);

    
    private data: IQuiz[] = [];

    constructor(protected httpClient: HttpClient, @IRouter private router: Router, private state: AppState){
    }

    

    async attached() {
        console.log("attached");
        console.log(this.state.role)
        console.log(this.state)

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