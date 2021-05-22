import { HttpClient, IRouteViewModel} from "aurelia";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";
import { IProduct } from "../../domain/IProduct";
import {IRouter, Router } from 'aurelia-direct-router';



export class ProductCreate implements IRouteViewModel  {

  
    private service: BaseService<IProduct> =
    new BaseService<IProduct>("https://hlepik.azurewebsites.net/api/v1/Pictures", this.httpClient, this.state.token);

    private description: string;
    private color: string;
    private productAge: number;
    private isBooked: boolean;
    private hasTransport: boolean;
    private height: number;
    private width: number;
    private depth: number;
    private unit: string;
    private county: string;
    private city: string;
    private category: string;
    private condition: string;
    private locationDescription: string;
    private appUserId: string;


    constructor(protected httpClient: HttpClient, private router: Router, private state: AppState) {
    }
  
    attached() {
  
    }

  
    async createClicked(event: Event) {
    
        event.preventDefault();
        event.stopPropagation();

        let response = await this.service.create({
            description: this.description,
            color: this.color,
            productAge: this.productAge,
            isBooked: this.isBooked,
            hasTransport: this.hasTransport,
            height: this.height,
            width: this.width,
            depth: this.depth,
            unit: this.unit,
            county: this.county,
            city: this.city,
            condition: this.condition,
            category: this.category,
            locationDescription: this.locationDescription,

        });

        // if (response.statusCode >= 200 && response.statusCode < 30) {
          
        //     await this.router.load('/product-index');
        // }
    }
  }
  
