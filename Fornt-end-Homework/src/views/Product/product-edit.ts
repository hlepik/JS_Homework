import { HttpClient, IRouteViewModel  } from "aurelia";
import { IProduct } from "../../domain/IProduct";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";
import { IUnit } from "../../domain/IUnit";
import { ICounty } from "../../domain/ICounty";
import { ICity } from "../../domain/ICity";
import { ICategory } from "../../domain/ICategory";
import { ICondition } from "../../domain/ICondition";
import {IRouter, Router } from 'aurelia-direct-router';


export class ProductEdit implements IRouteViewModel  {


    private service: BaseService<IProduct> =
        new BaseService<IProduct>("https://hlepik.azurewebsites.net/Products", this.httpClient, this.state.token);
      
        private unitService: BaseService<IUnit> =
        new BaseService<IUnit>("https://hlepik.azurewebsites.net/Units", this.httpClient, this.state.token);

        private countyService: BaseService<ICounty> =
        new BaseService<ICounty>("https://hlepik.azurewebsites.net/Counties", this.httpClient, this.state.token);

        private cityService: BaseService<ICity> =
        new BaseService<ICity>("https://hlepik.azurewebsites.net/Cities", this.httpClient, this.state.token);

        private categoryService: BaseService<ICategory> =
        new BaseService<ICategory>("https://hlepik.azurewebsites.net/Categories", this.httpClient, this.state.token);

        private conditionService: BaseService<ICondition> =
        new BaseService<ICondition>("https://hlepik.azurewebsites.net/Conditions", this.httpClient, this.state.token);

        
    private data: IProduct;
    private units: IUnit[] = [];
    private counties: ICounty[] = [];
    private cities: ICity[] = [];
    private categories: ICategory[] = [];
    private conditions: ICondition[] = [];
    private description: string;
    private color: string;
    private productAge: string;

    constructor(protected httpClient: HttpClient, private state: AppState, @IRouter private router: IRouter) {
    }

    async attached() {
        console.log("attached");
    }

    async load(parameters){
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        let unitResponse = await this.unitService.getAll();
        let cityResponse = await this.cityService.getAll();
        let countyResponse = await this.countyService.getAll();
        let conditionResponse = await this.conditionService.getAll();
        let categoryResponse = await this.categoryService.getAll();

        console.log(response);
        if (response.data) {
            this.data = response.data;
            this.units = unitResponse.data;
            this.cities = cityResponse.data;
            this.counties = countyResponse.data;
            this.conditions = conditionResponse.data;
            this.categories = categoryResponse.data;
        }
        
       
        
    }
    async editClicked(event: Event) { 


        let objToSave: IProduct = {
  
            description: this.data.description,
            isBooked: this.data.isBooked,
            hasTransport: this.data.hasTransport,
            height: this.data.height,
            width: this.data.width,
            depth: this.data.width,
            city: this.data.city,
            condition: this.data.condition,
            category: this.data.category,
            productAge: this.data.productAge,
            unit: this.data.unit,
            county: this.data.county,
            color: this.data.color,
            locationDescription: this.data.locationDescription,
            id: this.data.id
           
        };
        let response = await this.service.update(objToSave);
        if (response.statusCode >= 200 && response.statusCode < 300) {
          
            await this.router.load('/product-index');
        }
        
    } 
}

