import { HttpClient, IRouteViewModel, IRouter, Router } from "aurelia";
import { AppState } from "../../state/app-state";
import { IQuiz } from "../../domain/IQuiz";
import { IQuestion } from "../../domain/IQuestion";
import { BaseService } from "../../services/base-service";


export class QuestionCreate implements IRouteViewModel  {


    private service: BaseService<IQuestion > =
    new BaseService<IQuestion >("https://localhost:5001/api/v1/Questions", this.httpClient, this.state.token);
    private quizService: BaseService<IQuiz> =
    new BaseService<IQuiz>("https://localhost:5001/api/v1/Quizzes", this.httpClient, this.state.token);
  
    private data: IQuestion;
    private questionText: string = '';
    private quizId: string = '';
    private newQuizId: string = '';
    private quizName: string = '';
    private isPoll: boolean= false;
    private multipleChoice: boolean= false;
    private quizzes: IQuiz[] = [];
    private errorMessage: string | null;


    constructor(protected httpClient: HttpClient,  @IRouter private router: Router, private state: AppState) {
    }
  
    attached() {
  
    }
    async load(parameters){
        console.log("load", parameters);

        if(parameters[0] != null){
            this.quizId = parameters[0];
            this.quizName = parameters[1];
        }
        let response = await this.quizService.getAll();
        this.quizzes = response.data;
    }


  
    async createClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();

        var resultId = '';
        if(this.quizId != ''){
            resultId = this.quizId;
        }else{
            resultId = this.newQuizId;
        }

        this.errorMessage = undefined;
        let objToSave: IQuestion = {
            questionText: this.questionText,
            isPoll: this.isPoll,
            multipleChoice: this.multipleChoice,
            quizId: resultId,
    
        };

        if(this.questionText === ''){
            this.errorMessage = "Question can't be empty.";
        }
        if(this.quizId === '' && this.newQuizId === ''){
            this.errorMessage = "Quiz can't be empty.";
        }
       

        if(this.errorMessage === undefined){
            let response = await this.service.create(objToSave);

            console.log(this.state)
        
            console.log(response)
        
            if (response.statusCode >= 200 && response.statusCode < 400) {

            await this.router.load('/question-index');
            }
    
        }
    }
  
    
  }