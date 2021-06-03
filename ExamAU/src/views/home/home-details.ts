import { BaseService } from '../../services/base-service';
import { IQuestion } from "../../domain/IQuestion";
import { IAnswer } from "../../domain/IAnswer";
import { HttpClient } from "aurelia";
import { AppState } from "../../state/app-state";

import { IRouteViewModel, IRouter } from "aurelia";


export class HomeDetails implements IRouteViewModel {

    private percentage: string = '';
    private correctAnswers: number = 0;

    constructor(protected httpClient: HttpClient, private state: AppState, @IRouter private router: IRouter){

    }

    async attached() {
        console.log("attached");
    }

    async load(parameters){
 
        console.log("load", parameters);
     
        this.correctAnswers = parameters[0]
        
    }
    
        
     
}