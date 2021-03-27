import { AnimalService } from './../services/animal-service';
import { IAnimal } from "../domain/IAnimal";


    

export class AnimalView {
    private data: IAnimal[] =  [];


    
   
    constructor(private animalService: AnimalService){
        

    }
    
    async attached() {
       
        this.data = await this.animalService.getAll();
       
        
    }
   
}