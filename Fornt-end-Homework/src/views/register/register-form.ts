import { HttpClient, IRouter } from "aurelia";
import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";





export class RegisterForm {


  
      private service: AccountService =
          new AccountService("https://localhost:5001/api/v1/Account/Register", this.httpClient);
  
      private email: string;
      private password: string = "";
      private firstname: string = "";
      private lastname: string = "";
      private confirmpassword: string = "";
      private errorMessage: string | null;
  
  
      constructor(
          @IRouter private router: IRouter,
          private state: AppState,
          protected httpClient: HttpClient) {
  
      }
  
      async registerClicked(event: Event) {

        event.preventDefault();
        event.stopPropagation();

        console.log("lalala");
        let response = await this.service.register(this.email, this.password, this.firstname, this.lastname );
        console.log(response);
  
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (!regexEmail.test(this.email)) {
            response.statusCode = 400;

            this.errorMessage ="Email is not valid!";
        }
        if(this.password != this.confirmpassword){
            response.statusCode = 400;
    
            this.errorMessage = " Passwords doesn't match!";
        }
        if(this.firstname === "" || this.lastname === "" || this.password === ""){
            response.statusCode = 400;
  
            this.errorMessage  = " Field can't be empty!";
        }
      
          if (response.statusCode == 200 && response.data) {
              this.state.token = (response.data as IJwt).token;
              this.state.firstname = (response.data as IJwt).firstname;
              this.state.lastname = (response.data as IJwt).lastname;
  
  
              await this.router.load('/home-index');
          } 
        

          
  
      }
  
  }
  