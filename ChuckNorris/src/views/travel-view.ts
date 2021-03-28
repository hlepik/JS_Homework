import { TravelService } from './../services/travel-service';
import { ITravel } from "../domain/ITravel";
import { AppState } from '../state/app-state';

export class TravelView {
    private data: ITravel[] =  [];
    private jokes = [];

    constructor(private travelService: TravelService, private appState: AppState){
        
    }
    
    async attached() {
       
        this.data = await this.travelService.getAll(this.appState.travelData);
       
        
        this.data.forEach(element => {
            this.appState.travelData.unshift(element)
        });

        this.appState.travelData.forEach(element => {
            this.jokes = [ ...this.appState.travelData]
        });
    }
   
}