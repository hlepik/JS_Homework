import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMessageForm } from "../../dto/IMessageForm";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react';


const RowDisplay = (props: { messageForm: IMessageForm, appState: IAppState}) => (

    <tr>
        <td>
            {props.messageForm.email}
        </td>
        <td>
            {props.messageForm.subject}
        </td>
        <td>
            {props.messageForm.message}
        </td>
        <td>
            {props.messageForm.dateSent}
        </td>



        <td>
            <Link to={'/messageForm/' + props.messageForm.id}>{props.appState.langResources.crud.details}</Link> |
            <Link to={'/messageForm/delete/' + props.messageForm.id}>Delete</Link>
        </td>



    </tr>
);



const MessageFormIndex = () => {

    const appState = useContext(AppContext);
    const [messageForms, setMessageForm] = useState([] as IMessageForm[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IMessageForm>('/MessageForms', appState.token!);
        console.log(result);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setMessageForm(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    useEffect(() => {
        loadData();
    }, [loadData]);



    return (
        <>
            <h1>{appState.langResources.bllAppDTO.messageForms.messageForm}</h1>

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
                        <RowDisplay messageForm={messageForm} key={messageForm.id} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default MessageFormIndex;