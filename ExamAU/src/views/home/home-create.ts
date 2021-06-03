
import { BaseService } from '../../services/base-service';
import { HttpClient, IRouteViewModel, IRouter, Router } from "aurelia";
import { AppState } from "../../state/app-state";
import { IQuiz } from '../../domain/IQuiz';
import { IResult } from '../../domain/IResult';
import { IAnswer } from '../../domain/IAnswer';
import { IResultId } from '../../domain/IResultId';
import { IQuestion } from '../../domain/IQuestion';
import { IQuizCount } from '../../domain/IQuizCount';
export class HomeCreate{

    private service: BaseService<IQuiz> = 
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quizzes", this.httpClient, this.state.token);
        private answerService: BaseService<IAnswer> = 
        new BaseService<IAnswer>("https://localhost:5001/api/v1/Answers", this.httpClient, this.state.token);
        private resultService: BaseService<IResult> = 
        new BaseService<IResult>("https://localhost:5001/api/v1/Results", this.httpClient, this.state.token);
        private questionService: BaseService<IQuestion> = 
        new BaseService<IQuestion>("https://localhost:5001/api/v1/Questions", this.httpClient, this.state.token);
    private selectedItems: [] = [];
    private data: IQuiz;

    private totalAnswers: number = 0;

    constructor(protected httpClient: HttpClient, @IRouter private router: Router, private state: AppState){
    }

    
    async attached() {
        console.log("attached");
       
     
    }

    async load(parameters){
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
       
        if (response.data) {
            this.data = response.data;

        }
    }

    async submitClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();

        var points = 0;
        var id = "correctAnswers/" + this.data.id;
        var correctAnswers = await this.service.get(id);
       
        
        for (const key in this.selectedItems) {
            console.log(key.length)
            if(this.selectedItems[key] == true){
                
                var answer = await this.answerService.get(key);
                console.log(answer.data.questionId)
                var question = await this.questionService.get(answer.data.questionId);

                if(question.data.isPoll){
                    points++;
                }else{
                    if(question.data.multipleChoice){
                        if(answer.data.isAnswerCorrect){
                            points++;
                        }else if(points > 0){
                            points--;
                        }
                    }
                    else if(answer.data.isAnswerCorrect){
                        points++;
                    }
                }
                
            }

        }
        var quizResult = 100;
        console.log(correctAnswers.data[0] + "mata")
        console.log(correctAnswers.data + 'polli')
        var correctAnsw: number;

        if (points != 0 && correctAnswers.data != undefined)
        {
            quizResult = (points * 100) /correctAnswers.data[0];

        }
        var id = this.data.id;
        this.totalAnswers = correctAnswers.data[0];

        if(this.state.token != null){
            let objToSave: IResult = {
                totalAnswers: this.totalAnswers,
                correctAnswersCount: points,
                percentage: quizResult,
                quizId: id
                
            };
            let resultResponse = await this.resultService.create(objToSave);
            console.log(resultResponse)
        }
      
        var percentage = (this.data.percentage+ quizResult) / 2;
       
        let quizObjToSave: IQuiz = {
            peopleCount: this.data.peopleCount + 1,
            percentage: percentage,
            quizName: this.data.quizName,
            id: this.data.id
        }
        let m: IResultId= {
            percentage: percentage,
            points: points

        }

        let response = await this.service.update(quizObjToSave);
      
    
        if (response.statusCode >= 200 && response.statusCode < 400) {

            await this.router.load('/home-details(' + points+')');
       
        }
    
        
    }
    
}