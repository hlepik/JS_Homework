
import { BaseService } from '../../services/base-service';
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";
import { IQuiz } from '../../domain/IQuiz';

export class HomeIndex {

    private service: BaseService<IQuiz> = 
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quizzes", this.httpClient, this.state.token);
    private homeService: BaseService<IQuiz> = 
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quizzes/search/result/", this.httpClient, this.state.token);
    private data: IQuiz[] = [];
    private query: string = "";

    constructor(protected httpClient: HttpClient, private state: AppState){
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
    async submitClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();
        console.log(this.query)
        let response;
        if(this.query.length < 1){
            response = await this.service.getAll();
        }else{
            response = await this.homeService.getAll(this.query);
        }
       
        if (response.data) {
            this.data = response.data;
        }
    }

    
}