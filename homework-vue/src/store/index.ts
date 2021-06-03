import { createStore } from 'vuex'
import axios from 'axios'

export interface IState {
    token: string | null;
    firstname: string;
    lastname: string;
    role: string | null;
}

export const initialState: IState = {
    token: null,
    firstname: '',
    lastname: '',
    role: '',
}

export interface IJwtResponse {
    token: string;
    role: string;
    name: string;
    firstname: string;
    lastname: string;
}

export interface ILoginInfo {
    email: string;
    password: string;
}

export interface IRegisterInfo {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export default createStore({
    state: initialState,

    mutations: {
        logOut: (state: IState) => {
            state.token = null;
            state.firstname = '';
            state.lastname = '';
            state.role = '';
        },
        logIn: (state: IState, jwtResponse: IJwtResponse) => {
            state.token = jwtResponse.token;
            state.firstname = jwtResponse.firstname;
            state.lastname = jwtResponse.lastname;
            state.role = jwtResponse.role
        },
    },
    actions: {
        async logIn(context, login: ILoginInfo): Promise<void> {
            const loginDataStr = JSON.stringify(login);
            const response = await axios.post(
                'https://hlepik.azurewebsites.net/api/v1/Account/Login',
                loginDataStr,
                { headers: { 'Content-type': 'application/json' } }
            );
            if (response.status === 200) {
                const info = JSON.parse(atob(response.data.token.split('.')[1]));
                const jwtResponse: IJwtResponse = {
                    token: response.data.token,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    role: info["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                    name: info["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
                }
                console.log(jwtResponse.role)

                context.commit('logIn', jwtResponse);
            }
        },
        async register(context, register: IRegisterInfo): Promise<void> {
            const loginDataStr = JSON.stringify(register);
            const response = await axios.post(
                'https://localhost:5001/api/v1/Account/Register',
                loginDataStr,
                { headers: { 'Content-type': 'application/json' } }
            );
            if (response.status === 200) {
                context.commit('logIn', response.data);
            }
        },

    },
    getters: {
        isAuthenticated(context): boolean {
            return context.token !== null;
        }
    },
    modules: {
    }
})
