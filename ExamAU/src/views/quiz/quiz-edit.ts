import { BaseService } from '../../services/base-service';
import { IQuiz } from "../../domain/IQuiz";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";

import { IRouteViewModel, IRouter } from "aurelia";


export class QuizEdit implements IRouteViewModel {

    private service: BaseService<IQuiz> = 
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quizzes", this.httpClient, this.state.token);

    
    private data: IQuiz;
    private errorMessage: string | null;

    constructor(protected httpClient: HttpClient, private state: AppState, @IRouter private router: IRouter){

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
    async editClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();


        this.errorMessage = undefined;

        let objToSave: IQuiz = {
            id: this.data.id,
            quizName: this.data.quizName,
            percentage: this.data.percentage,
            peopleCount: this.data.peopleCount,
            createdAt: this.data.createdAt,
            questions: this.data.questions,
            questionsCount: this.data.questionsCount
        };
        if(this.data.quizName === ""){
            this.errorMessage = "Quiz name can't be empty.";
        }
       

        if(this.errorMessage === undefined){
            let response = await this.service.update(objToSave);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                
                await this.router.load('/quiz-index');
            }else{
                this.errorMessage += response.errorMessage;
            }
        }
        
    } 
}