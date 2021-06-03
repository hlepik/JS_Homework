import { HttpClient, IRouteViewModel, IRouter, Router } from "aurelia";
import { AppState } from "../../state/app-state";
import { IAnswer } from "../../domain/IAnswer";
import { IQuestion } from "../../domain/IQuestion";
import { BaseService } from "../../services/base-service";


export class AnswerCreate implements IRouteViewModel  {


    private service: BaseService<IAnswer > =
    new BaseService<IAnswer >("https://localhost:5001/api/v1/Answers", this.httpClient, this.state.token);
    private questionService: BaseService<IQuestion> =
    new BaseService<IQuestion>("https://localhost:5001/api/v1/Questions", this.httpClient, this.state.token);
  
    private data: IAnswer;
    private questionAnswer: string = '';
    private questionId: string = '';
    private newQuestionId: string = '';
    private questions: IQuestion[] = [];
    private isAnswerCorrect: boolean = false;
    private errorMessage: string | null;
    private questionName: string = '';
   
    constructor(protected httpClient: HttpClient,  @IRouter private router: Router, private state: AppState) {
    }
  
    attached() {
  
      
    }
    async load(parameters){
        console.log("load", parameters);
        if(parameters[0] != null){
            this.questionId = parameters[0];
            this.questionName = parameters[1]
        }
        let response = await this.questionService.getAll();
        this.questions = response.data;
      
        
    }

  
    async createClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();
  
        var resultId = '';
        if(this.questionId != ''){
            resultId = this.questionId;
        }else{
            resultId = this.newQuestionId;
        }
        this.errorMessage = undefined;
        
        if(this.questionAnswer === ''){
            this.errorMessage = "Answer can't be empty.";
        }
        if(this.questionId === '' && this.newQuestionId === ''){
            this.errorMessage = "Question can't be empty.";
        }
       
        if(this.errorMessage === undefined){
            let objToSave: IAnswer = {
                questionAnswer: this.questionAnswer,
                isAnswerCorrect: this.isAnswerCorrect,
                questionId: resultId
            };
            console.log(objToSave)
            let response = await this.service.create(objToSave);

            console.log(this.state)
        
            console.log(response)
        
            if (response.statusCode >= 200 && response.statusCode < 400) {

            await this.router.load('/answer-index');
            }
    
        }
    }
  
    
  }