import { createStore } from 'vuex'
import axios from 'axios'

export interface IState {
    token: string | null;
    firstname: string;
    lastname: string;
}

export const initialState: IState = {
    token: null,
    firstname: '',
    lastname: '',
}

export interface IJwtResponse {
    token: string;
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
export interface TEntity {
   
}

export default createStore({
    state: initialState,
    mutations: {
        logOut: (state: IState) => {
            state.token = null;
            state.firstname = '';
            state.lastname = '';
        },
        logIn: (state: IState, jwtResponse: IJwtResponse) => {
            state.token = jwtResponse.token;
            state.firstname = jwtResponse.firstname;
            state.lastname = jwtResponse.lastname;
        },
    },
    actions: {
        async logIn(context, login: ILoginInfo): Promise<void> {
            const loginDataStr = JSON.stringify(login);
            const response = await axios.post(
                'https://localhost:5001/api/v1/Account/login',
                loginDataStr,
                { headers: { 'Content-type': 'application/json' } }
            );
            if (response.status === 200) {
                context.commit('logIn', response.data);
            }
        },
        async register(context, register: IRegisterInfo): Promise<void> {
            const loginDataStr = JSON.stringify(register);
            const response = await axios.post(
                'https://localhost:5001/api/v1//Account/Register',
                loginDataStr,
                { headers: { 'Content-type': 'application/json' } }
            );
            if (response.status === 200) {
                context.commit('register', response.data);
            }
        }

    },
    getters: {
    },
    modules: {
    }
})
