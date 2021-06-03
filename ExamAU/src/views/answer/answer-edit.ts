import { BaseService } from '../../services/base-service';
import { IQuestion } from "../../domain/IQuestion";
import { IAnswer } from "../../domain/IAnswer";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";

import { IRouteViewModel, IRouter } from "aurelia";


export class AnswerEdit implements IRouteViewModel {

    private questionService: BaseService<IQuestion> = 
        new BaseService<IQuestion>("https://localhost:5001/api/v1/Questions", this.httpClient, this.state.token);
        private service: BaseService<IAnswer> =
        new BaseService<IAnswer>("https://localhost:5001/api/v1/Answers", this.httpClient, this.state.token);
    
    private data: IAnswer;
    private questions: IQuestion[] = [];
    private errorMessage: string | null;

    constructor(protected httpClient: HttpClient, private state: AppState, @IRouter private router: IRouter){

    }

    async attached() {
        console.log("attached");
    }

    async load(parameters){
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
       
        let questionResponse = await this.questionService.getAll();
        console.log(response);
        if (response.data) {
            this.data = response.data;
    
        }
        if(questionResponse.data){
            this.questions = questionResponse.data;
        }
    
    }
    async editClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();


        this.errorMessage = undefined;

        let objToSave: IAnswer = {
            id: this.data.id,
            questionAnswer: this.data.questionAnswer,
            isAnswerCorrect: this.data.isAnswerCorrect,
            questionId: this.data.questionId
        }
        if(this.data.questionAnswer === ""){
            this.errorMessage = "Answer can't be empty.";
        }
       

        if(this.errorMessage === undefined){
            let response = await this.service.update(objToSave);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                
                await this.router.load('/answer-index');
            }else{
                this.errorMessage += response.errorMessage;
            }
        }
        
    } 
}