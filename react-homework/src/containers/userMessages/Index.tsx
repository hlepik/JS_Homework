import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IUserMessages } from "../../dto/IUserMessages";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react'


const RowDisplay = (props: { userMessage: IUserMessages, appState: IAppState }) => (
    <tr>
        <td>
            {props.userMessage.senderEmail}
        </td>
        <td>
            {props.userMessage.subject}
        </td>
        <td>
            {props.userMessage.message}
        </td>
        <td>
            {props.userMessage.dateSent}
        </td>

        <td>
            <Link to={'/messageForm/create'}>{props.appState.langResources.crud.reply}</Link> |
            <Link to={'/userMessages/' + props.userMessage.id}>{props.appState.langResources.crud.view}</Link> |
            <Link to={'/userMessages/delete/' + props.userMessage.id}>Delete</Link>
        </td>
    </tr>
);


const UserMessagesIndex = () => {

    const appState = useContext(AppContext);
    const [userMessages, setUserMessages] = useState([] as IUserMessages[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IUserMessages>('/UserMessages', appState.token!);
        console.log(result);
        console.log(appState)

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUserMessages(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

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
                        <RowDisplay userMessage={userMessage} key={userMessage.id} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default UserMessagesIndex;