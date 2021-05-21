import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMessageForm } from "../../dto/IMessageForm";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import Moment from 'moment';

const MessageFormIndex = () => {

    const appState = useContext(AppContext);
    const [messageForms, setMessageForm] = useState([] as IMessageForm[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const element = <FontAwesomeIcon icon={faTrash} />

    const loadData = useCallback(async () => {
    

        let data = window.localStorage.getItem('state');
        window.localStorage.clear();

        if (data != null) {
            let state = JSON.parse(data);
            console.log(state)
            appState.currentLanguage = state.currentLanguage;
            appState.supportedLanguages = state.supportedLanguages;
            appState.langResources = state.langResources;
            console.log(appState)
            appState.setAuthInfo(state.token, state.firstName, state.lastName);
        }
        let result = await BaseService.getAll<IMessageForm>('/MessageForms', appState.token!);

        console.log(result)

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setMessageForm(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    const deleteClicked = async (e: Event, id: string) => {

        e.preventDefault();

        console.log(id)
        let result = await BaseService.delete<IMessageForm>('/MessageForms/' + id, appState.token!);


        if (result.ok) {
            window.localStorage.setItem('state', JSON.stringify(appState));
            window.location.reload();
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }
  

    useEffect(() => {
        loadData();
    }, [loadData]);



    return (
        <>
            <h1>{appState.langResources.bllAppDTO.messageForms.message}</h1>

            <p>
                <Link to={'/messageForm/create'}>{appState.langResources.crud.create}</Link>
            </p>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            {appState.langResources.bllAppDTO.messageForms.email}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.messageForms.subject}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.messageForms.message}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.messageForms.dateSent}
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {messageForms.map(messageForm =>
                        <tr key={messageForm.id}>
                            <td>
                                {messageForm.email}
                            </td>
                            <td>
                                {messageForm.subject}
                            </td>
                            <td>
                                {messageForm.message}
                            </td>
                            <td >
                              {appState.currentLanguage.name === "en" ?

                                <>
                                  {Moment(messageForm.dateSent).format("YYYY.MM.DD HH:mm:ss")}
                                  </>
                                  :
                                  <>
                                    {Moment(messageForm.dateSent).format('DD.MM.YYYY HH:mm:ss')}
                                  </>


                            }
                            
                            </td>

                            <td>
                                <Link to={'/messageForm/' + messageForm.id}>{appState.langResources.crud.details}</Link> |
                                <span  onClick={(e) => swal({text: appState.langResources.crud.deleteConfirm, dangerMode: true}).then(willDelete => {if(willDelete){deleteClicked(e.nativeEvent, messageForm.id!)}})}>

                                   <span id="deleteButton" >
                                    {element}
                                    </span>
                                </span>
                            </td>



                        </tr>)}
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default MessageFormIndex;