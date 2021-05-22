
import { HttpClient, IRouteViewModel } from "aurelia";
import { AppState } from "../../state/app-state";
import { IProduct } from "../../domain/IProduct";
import { BaseService } from "../../services/base-service";
import {IRouter, Router } from 'aurelia-direct-router';


export class ProductDelete implements IRouteViewModel  {


    private service: BaseService<IProduct> =
    new BaseService<IProduct>("https://hlepik.azurewebsites.net/api/v1/Products", this.httpClient, this.state.token);

   

    private data: IProduct;


    constructor(protected httpClient: HttpClient, private state: AppState,  @IRouter private router: IRouter) {
    }
  
    async attached() {
        console.log("attached");
    
    }
    

    async load(parameters){
        console.log("load", parameters);
      

        let response = await this.service.get(parameters[0]);
        console.log(response);
        if (response.data) {
            this.data = response.data;
        }

    }
    
    async deleteClicked(event: Event) {

        event.preventDefault();
        event.stopPropagation();
  
        let response = await this.service.delete(this.data.id);

        if (response.statusCode >= 200 && response.statusCode < 300) {
          
            await this.router.load('/product-index');
        }
    }
}

