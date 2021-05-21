import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IUserMessages } from "../../dto/IUserMessages";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
import Moment from 'moment';


const UserMessagesIndex = () => {

    const appState = useContext(AppContext);
    const [userMessages, setUserMessages] = useState([] as IUserMessages[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const element = <FontAwesomeIcon icon={faTrash} />

    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IUserMessages>('/UserMessages', appState.token!);
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

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUserMessages(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    const deleteClicked = async (e: Event, id: string) => {

        e.preventDefault();

        console.log(id)
        let result = await BaseService.delete<IUserMessages>('/UserMessages/' + id, appState.token!);

        if (result.ok) {
            window.localStorage.setItem('state', JSON.stringify(appState));
            window.location.reload();
        }
    }

    useEffect(() => {
        loadData();
    }, [loadData])


    return (
        <>
            <h1>{appState.langResources.bllAppDTO.userMessage.userMessages}</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            {appState.langResources.bllAppDTO.userMessage.from}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.userMessage.subject}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.userMessage.message}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.userMessage.dateSent}
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {userMessages.map(userMessage =>
                        <tr>
                            <td>
                                {userMessage.senderEmail}
                            </td>
                            <td>
                                {userMessage.subject}
                            </td>
                            <td>
                                {userMessage.message}
                            </td>
                            <td>
                                {appState.currentLanguage.name === "en" ?

                                    <>
                                        {Moment(userMessage.dateSent).format("YYYY.MM.DD HH:mm:ss")}
                                    </>
                                    :
                                    <>
                                        {Moment(userMessage.dateSent).format('DD.MM.YYYY HH:mm:ss')}
                                    </>


                                }
                            </td>

                            <td>
                                <Link to={'/messageForm/create'}>{appState.langResources.crud.reply}</Link> |
                                 <Link to={'/userMessages/' + userMessage.id}>{appState.langResources.crud.view}</Link> |
                                 <span onClick={(e) => swal({ text: appState.langResources.crud.deleteConfirm, dangerMode: true }).then(willDelete => { if (willDelete) { deleteClicked(e.nativeEvent, userMessage.id!) } })}>

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

export default UserMessagesIndex;