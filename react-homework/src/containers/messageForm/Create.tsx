import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";

const MessageFormCreate = () => {

    const appState = useContext(AppContext);
    const [editData, setMessageForm] = useState({ email: '', subject: '', message: ''});

    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();

    const submitClicked = async (e: Event) => {

        e.preventDefault();


        if(editData.email.length < 2 || editData.email.length > 128){
            setAlertMessage('Email is not valid!');
     
        } else {
            setAlertMessage('');
            console.log(editData)
            console.log(appState.token)

            const url = '/MessageForms';
            let response = await BaseService.post(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/messageForm')
            } else {
                setAlertMessage(response.messages![0]);
            }

        }

    }


    useEffect(() => {

    }, []);


    return (
        <>
            <h2>{appState.langResources.crud.create}</h2 >
            <h3>{appState.langResources.bllAppDTO.messageForms.messageForm}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.messageForms.email}</label>
                                <input value={editData.email} onChange={e => setMessageForm({ ...editData, email: e.target.value })} className="form-control" type="text" id="Input_MessageFormName" name="Input.MessageFormName" placeholder={editData.email} autoComplete="current-name" minLength={2}/>
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.messageForms.subject}</label>
                                <input value={editData.subject} onChange={e => setMessageForm({ ...editData, subject: e.target.value })} className="form-control" type="text" id="Input_MessageFormSubject" name="Input.MessageFormSubject" placeholder={editData.subject} autoComplete="current-name" minLength={2}/>
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.messageForms.message}</label>
                                <input value={editData.message} onChange={e => setMessageForm({ ...editData, message: e.target.value })} className="form-control" type="text" id="Input_MessageFormMessage" name="Input.MessageFormMessage" placeholder={editData.message} autoComplete="current-name" minLength={2}/>
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                            </div>
                            <p>
                                <Link to={'/messageForm'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
    
        </>
    );
}

export default MessageFormCreate;