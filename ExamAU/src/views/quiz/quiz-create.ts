import { HttpClient, IRouteViewModel, IRouter, Router } from "aurelia";
import { AppState } from "../../state/app-state";
import { IQuiz } from "../../domain/IQuiz";
import { BaseService } from "../../services/base-service";


export class QuizCreate implements IRouteViewModel  {


    private service: BaseService<IQuiz > =
    new BaseService<IQuiz >("https://localhost:5001/api/v1/Quizzes", this.httpClient, this.state.token);
  
  
    private data: IQuiz;
    private quizName: string = '';
    private errorMessage: string | null;

    constructor(protected httpClient: HttpClient,  @IRouter private router: Router, private state: AppState) {
    }
  
    attached() {
  
    }
  
    async createClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();

        this.errorMessage = undefined;
        let objToSave: IQuiz = {
            quizName: this.quizName,
    
        };

        if(this.quizName === ''){
            this.errorMessage = "Quiz name can't be empty.";
        }
       

        if(this.errorMessage === undefined){
            console.log(objToSave)
            let response = await this.service.create(objToSave);

        
            if (response.statusCode >= 200 && response.statusCode < 400) {

            await this.router.load('/quiz-index');
            }
    
        }
    }
  
    
  }