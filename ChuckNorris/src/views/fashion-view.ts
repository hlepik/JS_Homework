import { FashionService } from './../services/fashion-service';
import { IFashion } from "../domain/IFashion";
import { AppState } from '../state/app-state';

export class FashionView {
    private data: IFashion[] =  [];
    private jokes = [];

    constructor(private fashionService: FashionService, private appState: AppState){
        
    }
    
    async attached() {
       
        this.data = await this.fashionService.getAll(this.appState.fashionData);
       
        
        this.data.forEach(element => {
            this.appState.fashionData.unshift(element)
        });

        this.appState.fashionData.forEach(element => {
            this.jokes = [ ...this.appState.fashionData]
        });
       
    }
   
}