import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";

const Login = () => {
    const appState = useContext(AppContext);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [alertMessage, setAlertMessage] = useState('');

    const logInClicked = async (e: Event) => {
        e.preventDefault();
       

        setAlertMessage('');
        let response = await IdentityService.Login('Account/Login', loginData);

        console.log(response)
        if (!response.ok) {
          
            setAlertMessage(appState.langResources.common.loginProblem);
        } else {
            setAlertMessage('');


            appState.setAuthInfo(response.data!.token, response.data!.firstname, response.data!.lastname);
        }
        
    }

    return (
        <>
            { appState.token !== null ? <Redirect to="/" /> : null}
            <h1>{appState.langResources.account.logIn}</h1>
            <form onSubmit={(e) => logInClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="Input_Email">{appState.langResources.account.email}</label>
                                <input value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} className="form-control" type="email" id="Input_Email" name="Input.Email"  autoComplete="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">{appState.langResources.account.password}</label>
                                <input value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} className="form-control" type="password" id="Input_Password" name="Input.Password"  autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => logInClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.account.logIn}</button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Login;
