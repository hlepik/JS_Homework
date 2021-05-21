
import { HttpClient, IRouteViewModel } from "aurelia";
import {IRouter, Router } from 'aurelia-direct-router';
import { AppState } from "../../state/app-state";
import { IPictureEdit } from "../../domain/IPictureEdit";
import { BaseService } from "../../services/base-service";

export class PictureDelete implements IRouteViewModel  {


    private service: BaseService<IPictureEdit> =
    new BaseService<IPictureEdit>("https://localhost:5001/api/v1/Pictures", this.httpClient, this.state.token);

    private data: IPictureEdit;

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
          
            await this.router.load('/picture-index');
        }
    }
}