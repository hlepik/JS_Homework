import { IAnimal } from './../domain/IAnimal';
import { HttpClient, inject } from "aurelia";
import { data } from 'jquery';

@inject()
export class AnimalService{

    constructor(private httpClient: HttpClient) {

    }

    async getAll(): Promise<IAnimal[]> {


  
        let count = 0;
        let jokes = [];
     
        while(count < 5){
            count++;
            const response = await this.httpClient
            .get("https://api.chucknorris.io/jokes/random?category=animal", { cache: "no-store" });
            console.log(response + 'response');
            if (!response.ok) {
            
                return [];
            }
            const data = (await response.json()) as IAnimal[];

         
            jokes.push(data);
            if(count === 5){
                return jokes;
            }
        }
    
  
    }
}