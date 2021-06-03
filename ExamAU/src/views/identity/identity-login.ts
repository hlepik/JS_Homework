import { HttpClient, IRouter } from "aurelia";
import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";

export class IdentityLogin {
  //AccountService

    private service: AccountService =
        new AccountService("https://localhost:5001/api/v1/Account/Login", this.httpClient);

    private email: string = "";
    private password: string = "";
    private errorMessage: string;

    constructor(
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient) {

    }

    async loginClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        console.log(this.email, this.password);
   

        let response = await this.service.login(this.email, this.password);
        console.log(response);

        
        if (response.statusCode == 200 && response.data ) {

            this.state.token = (response.data as IJwt).token;
            this.state.firstname = (response.data as IJwt).firstname;
            this.state.lastname = (response.data as IJwt).lastname;

            const info = JSON.parse(atob(this.state.token!.split('.')[1]));
            let role = info["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            this.state.role = role;

            await this.router.load('/home-index');
        }else{
            this.errorMessage = "Email/password problem!";
        }
        

    }

}


