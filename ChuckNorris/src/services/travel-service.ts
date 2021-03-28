import { ITravel } from '../domain/ITravel';
import { HttpClient, inject } from "aurelia";
import { data } from 'jquery';

@inject()
export class TravelService{

    constructor(private httpClient: HttpClient) {

    }

    async getAll(allJokes): Promise<ITravel[]> {


        let count = 0;
        let jokes = [];
        let idList = [];
        let requestCount = 0;

        while(count < 5){
            requestCount++;
            const response = await this.httpClient
            .get("https://api.chucknorris.io/jokes/random?category=animal", { cache: "no-store" });
            console.log(response + 'response');
           if (!response.ok) {
            
                return [];
            }
            const data = (await response.json()) as ITravel[];

            let dataId;
            for (const key in data) {
                if(key === "id"){
                    dataId = data[key];
                }
            }
           
            let hasDuplicate = false;

            for (var key in allJokes) {
                var obj = allJokes[key];
           
                for (var prop in obj) {
                    if(prop === "id"){
                        if(obj[prop] === dataId){
                            hasDuplicate = true;

                            
                        }
                    }
                }
            }

            let idDuplicate = false;
            if(!hasDuplicate){

                for (const key in idList) {
                    if(idList[key] === dataId){
                        idDuplicate = true;
                    }
                }

                if(!idDuplicate){
                    idList.push(dataId)
                    jokes.push(data);
                    count++;
                }
            }       
           
            if(count === 5 || requestCount === 15){
                return jokes;
            }
        }
    
  
    }
}