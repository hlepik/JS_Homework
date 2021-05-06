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

    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;


    const registerClicked = async (e: Event) => {
        e.preventDefault();


        if (registerData.email === '' || !regexEmail.test(registerData.email)) {
            setAlertMessage('Email not valid!');
        }
        else if (registerData.firstName === '' || registerData.lastName === '') {
            setAlertMessage('First name or Last name can not be empty');
        } else if (registerData.password != confirm.confirmPassword){
            setAlertMessage('Passwords do not match!');
        }else {
            let response = await IdentityService.register('account/register', registerData);
            if (!response.ok) {
                setAlertMessage(response.messages![0]);
            } else {
                setAlertMessage('');


                appState.setAuthInfo(response.data!.token, response.data!.firstname, response.data!.lastname);
            }
        }
    }

    return (
        <>
            { appState.token !== null ? <Redirect to="/" /> : null}
            <h1>Register</h1>
            <form onSubmit={(e) => registerClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="Input_FirstName">First name</label>
                                <input value={registerData.firstName} onChange={e => setRegisterData({ ...registerData, firstName: e.target.value })} className="form-control" type="text" id="Input_FirstName" name="Input.FirstName" placeholder="First name..." autoComplete="current-firstName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_LastName">Last name</label>
                                <input value={registerData.lastName} onChange={e => setRegisterData({ ...registerData, lastName: e.target.value })} className="form-control" type="text" id="Input_LastName" name="Input.LastName" placeholder="Last name..." autoComplete="current-lastName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Email">Email</label>
                                <input value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} className="form-control" type="email" id="Input_Email" name="Input.Email" placeholder="user@example.com" autoComplete="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">Password</label>
                                <input value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} className="form-control" type="password" id="Input_Password" name="Input.Password" placeholder="Insert your password..." autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_ConfirmPassword">Confirm Password</label>
                                <input value={confirm.confirmPassword} onChange={e => setConfirm({ ...registerData, confirmPassword: e.target.value })} className="form-control" type="password" id="Input_ConfirmPassword" name="Input.ConfirmPassword" placeholder="Confirm your password..." autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => registerClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Register;
