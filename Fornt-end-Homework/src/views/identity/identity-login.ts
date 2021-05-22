import { HttpClient } from "aurelia";
import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";
import {IRouter, Router } from 'aurelia-direct-router';


export class IdentityLogin {
  //AccountService

    private service: AccountService =
        new AccountService("https://hlepik.azurewebsites.net/Account/login", this.httpClient);

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

        console.log('siin')
        if (response.statusCode == 200 && response.data ) {
            this.state.token = (response.data as IJwt).token;
            this.state.firstname = (response.data as IJwt).firstname;
            this.state.lastname = (response.data as IJwt).lastname;

            await this.router.load('/home-index');
        }else{
            this.errorMessage = response.errorMessage;
        }
        

    }

}

