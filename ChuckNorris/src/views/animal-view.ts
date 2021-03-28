import { AnimalService } from './../services/animal-service';
import { IAnimal } from "../domain/IAnimal";
import { count } from 'console';
import { AppState } from '../state/app-state';

export class AnimalView {
    private data: IAnimal[] =  [];
    private jokes = [];
   
    constructor(private animalService: AnimalService, private appState: AppState){


    }
    
    async attached() {
       

        this.data = await this.animalService.getAll(this.appState.animalData);
       
        this.data.forEach(element => {
            this.appState.animalData.unshift(element)
        });

        this.appState.animalData.forEach(element => {
            this.jokes = [ ...this.appState.animalData]
        });
       
     
       

          

       

    }
       
        
}
   
