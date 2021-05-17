import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IMessageForm } from "../../dto/IMessageForm";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import React, { useCallback } from 'react';

const MessageFormDelete = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [messageForm, setMessageForm] = useState({} as IMessageForm);
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IMessageForm>('/MessageForms/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setMessageForm(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])

    const deleteClicked = async (e: Event) => {

        e.preventDefault();
        let result = await BaseService.delete<IMessageForm>('/MessageForms/' + id, appState.token!);


        if (result.ok) {
            history.push('/messageForm');
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }


    }

    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <div>
            <h3>{appState.langResources.crud.delete}</h3>
            <h2>{appState.langResources.crud.confirmation}</h2>
            <h3>{appState.langResources.bllAppDTO.messageForms.messageForm}</h3>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.messageForms.email}</dt>

                <dd className="col-sm-10">
                    {messageForm.email}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.messageForms.subject}</dt>

                <dd className="col-sm-10">
                    {messageForm.subject}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.messageForms.message}</dt>

                <dd className="col-sm-10">
                    {messageForm.message}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.messageForms.dateSent}</dt>

                <dd className="col-sm-10">
                    {messageForm.dateSent}
                </dd>
                <hr />

                <div className="form-group" >
                    <div id="button">
                        <button onClick={(e) => deleteClicked(e.nativeEvent)} type="submit" className="btn btn-danger">{appState.langResources.crud.delete}</button>
                        <p id="backToList">
                            <Link to={'/messageForm'}>{appState.langResources.crud.index}</Link>
                        </p>
                    </div>

                </div>

            </dl>
            <Loader {...pageStatus} />
        </div>
    );
}

export default MessageFormDelete;