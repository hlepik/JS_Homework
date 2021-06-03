import { BaseService } from '../../services/base-service';
import { IQuestion } from "../../domain/IQuestion";
import { IQuiz } from "../../domain/IQuiz";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";

import { IRouteViewModel, IRouter } from "aurelia";


export class QuestionEdit implements IRouteViewModel {

    private service: BaseService<IQuestion> = 
        new BaseService<IQuestion>("https://localhost:5001/api/v1/Questions", this.httpClient, this.state.token);
        private quizService: BaseService<IQuiz> =
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quizzes", this.httpClient, this.state.token);
    
    private data: IQuestion;
    private quizzes: IQuiz[] = [];
    private errorMessage: string | null;

    constructor(protected httpClient: HttpClient, private state: AppState, @IRouter private router: IRouter){

    }

    async attached() {
        console.log("attached");
    }


    async load(parameters){
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
       
        let quizResponse = await this.quizService.getAll();
        console.log(response);
        if (response.data) {
            this.data = response.data;
    
        }
        if(quizResponse.data){
            this.quizzes = quizResponse.data;
        }
    
    }
    async editClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();


        this.errorMessage = undefined;

        let objToSave: IQuestion = {
            id: this.data.id,
            questionText: this.data.questionText,
            isPoll: this.data.isPoll,
            multipleChoice: this.data.multipleChoice,
            quizId: this.data.quizId,
            dateAdded: this.data.dateAdded
        };
        if(this.data.questionText === ""){
            this.errorMessage = "Question can't be empty.";
        }
       

        if(this.errorMessage === undefined){
            let response = await this.service.update(objToSave);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                
                await this.router.load('/question-index');
            }else{
                this.errorMessage += response.errorMessage;
            }
        }
        
    } 
}