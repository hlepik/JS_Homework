import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";
import { HttpClient, IRouter } from "aurelia";


export class RegisterForm {


  
      private service: AccountService =
          new AccountService("https://localhost:5001/api/v1/Account/Register", this.httpClient);
  
      private email: string ="";
      private password: string = "";
      private firstname: string ="";
      private lastname: string ="";
      private confirmpassword: string;
      private errorMessage: string | null;
  
  
      constructor(
          @IRouter private router: IRouter,
          private state: AppState,
          protected httpClient: HttpClient) {
  
      }
  
      async registerClicked(event: Event) {

        event.preventDefault();
        event.stopPropagation();

        this.errorMessage = undefined;
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (!regexEmail.test(this.email)) {
        
            this.errorMessage ="Email is not valid!";
        }
        if(this.firstname === ""){
            this.errorMessage += " First Name can't be empty!";
        }
        if(this.lastname === ""){
            this.errorMessage += " Last Name can't be empty!";
        }
        if(this.password != this.confirmpassword){
            this.errorMessage += " Passwords not matching.";
        }
  
        let response;
        console.log(this.errorMessage)
        if(this.errorMessage === undefined){

            response = await this.service.register(this.email, this.password, this.firstname, this.lastname);
            console.log(response.data)
          
            if (response.statusCode == 200 && response.data) {
                this.state.token = (response.data as IJwt).token;
                this.state.firstname = (response.data as IJwt).firstname;
                this.state.lastname = (response.data as IJwt).lastname;

                const info = JSON.parse(atob(this.state.token!.split('.')[1]));
                let role = info["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                this.state.role = role;


                await this.router.load('/home-index');
            }else{
                this.errorMessage = response.errorMessage;
            }    
    }

        
        
     
    }

}
  