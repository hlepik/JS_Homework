import { HttpClient, IRouteViewModel , IRouter, Router } from "aurelia";
import { IPicture } from "../../domain/IPicture";
import { IPictureEdit } from "../../domain/IPictureEdit";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";
import { IProduct } from "../../domain/IProduct";
import { IMessage } from "../../types/IMessage";
import { IJwt } from "../../types/IJwt";

export class PictureEdit implements IRouteViewModel  {
 

    private service: BaseService<IPictureEdit> =
        new BaseService<IPictureEdit>("https://localhost:5001/api/v1/Pictures", this.httpClient, this.state.token);
      
        private productService: BaseService<IProduct> =
        new BaseService<IProduct>("https://localhost:5001/api/v1/Products", this.httpClient, this.state.token);
        
    private data: IPictureEdit;
    private products: IProduct[] = [];
    private errorMessage: string | null;
    


   

    constructor(protected httpClient: HttpClient, private state: AppState, @IRouter private router: IRouter) {
    }

    async attached() {
        console.log("attached");
    }

    

    async load(parameters){
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        let productResponse = await this.productService.getAll();
      
        console.log(response);
        if (response.data) {
            this.data = response.data;
            this.products = productResponse.data;
            
        }
    
    }
    async editClicked(event: Event){ 
        event.preventDefault();
        event.stopPropagation();


        this.errorMessage = undefined;

        let objToSave: IPictureEdit = {
            id: this.data.id,
            url: this.data.url,
            productId: this.data.productId
        };
        if(this.data.url === "" || this.data.productId === ""){
            this.errorMessage = "Field can't be empty.";
        }
       

        if(this.errorMessage === undefined){
            let response = await this.service.update(objToSave);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                
                await this.router.load('/picture-index');
            }else{
                this.errorMessage += response.errorMessage;
            }
        }
        
    } 
}
