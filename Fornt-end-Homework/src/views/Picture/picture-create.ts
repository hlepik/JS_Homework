import { HttpClient, IRouteViewModel } from "aurelia";
import {IRouter, Router } from 'aurelia-direct-router';
import { AppState } from "../../state/app-state";
import { IPicture } from "../../domain/IPicture";
import { IProduct } from "../../domain/IProduct";
import { BaseService } from "../../services/base-service";


export class PictureCreate implements IRouteViewModel  {


    private service: BaseService<IPicture> =
    new BaseService<IPicture>("https://hlepik.azurewebsites.net/api/v1/Pictures", this.httpClient, this.state.token);
    private productService: BaseService<IProduct> =
    new BaseService<IProduct>("https://hlepik.azurewebsites.net/api/v1/Products", this.httpClient, this.state.token);
  
    private data: IPicture;
    private products: IProduct[] = [];
    private errorMessage: string | null;

    constructor(protected httpClient: HttpClient,  @IRouter private router: Router, private state: AppState) {
    }
  
    attached() {
  
    }
    async load(parameters){
        console.log("load", parameters);

        let response = await this.productService.getAll();
        this.products = response.data;
    }

  
    async createClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();

        this.errorMessage = undefined;
        let objToSave: IPicture = {
            url: this.data.url,
            productId: this.data.productId
        };

        if(this.data.url === undefined || this.data.productId === undefined){
            this.errorMessage = "Field can't be empty.";
        }
       

        if(this.errorMessage === undefined){
            let response = await this.service.create(objToSave);

            console.log(this.state)
        
            console.log(response)
        
            if (response.statusCode >= 200 && response.statusCode < 400) {
                console.log("olen siin")
            await this.router.load('/picture-index');
            }
    
        }
    }
  
    
  }