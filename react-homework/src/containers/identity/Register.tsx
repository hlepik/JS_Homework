import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";

const Register = () => {
    const appState = useContext(AppContext);

    const [registerData, setRegisterData] = useState({ email: '', password: '', firstName: '', lastName: '' });
    const [alertMessage, setAlertMessage] = useState('');
    const [confirm, setConfirm] = useState({confirmPassword: ''});

    const registerClicked = async (e: Event) => {
        e.preventDefault();


        if (registerData.firstName === '' || registerData.lastName === '') {
            setAlertMessage(appState.langResources.common.minLength);
        } else if (registerData.password !== confirm.confirmPassword || registerData.password.length === 0){
            setAlertMessage(appState.langResources.account.passwordDontMatch);
        }else {
            let response = await IdentityService.register('account/register', registerData);
            if (!response.ok) {
                setAlertMessage(appState.langResources.common.alreadyRegistered);
            } else {
                setAlertMessage('');


                appState.setAuthInfo(response.data!.token, response.data!.firstname, response.data!.lastname);
            }
        }
    }

    return (
        <>
            { appState.token !== null ? <Redirect to="/" /> : null}
            <h1>{appState.langResources.account.register}</h1>
            <form onSubmit={(e) => registerClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="Input_FirstName">{appState.langResources.account.firstName}</label>
                                <input value={registerData.firstName} onChange={e => setRegisterData({ ...registerData, firstName: e.target.value })} className="form-control" type="text" id="Input_FirstName" name="Input.FirstName"  autoComplete="current-firstName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_LastName">{appState.langResources.account.lastName}</label>
                                <input value={registerData.lastName} onChange={e => setRegisterData({ ...registerData, lastName: e.target.value })} className="form-control" type="text" id="Input_LastName" name="Input.LastName"  autoComplete="current-lastName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Email">{appState.langResources.account.email}</label>
                                <input value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} className="form-control" type="email" id="Input_Email" name="Input.Email"  autoComplete="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">{appState.langResources.account.password}</label>
                                <input value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} className="form-control" type="password" id="Input_Password" name="Input.Password"  autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_ConfirmPassword">{appState.langResources.account.confirmPassword}</label>
                                <input value={confirm.confirmPassword} onChange={e => setConfirm({ ...registerData, confirmPassword: e.target.value })} className="form-control" type="password" id="Input_ConfirmPassword" name="Input.ConfirmPassword"  autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => registerClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.account.register}</button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Register;
