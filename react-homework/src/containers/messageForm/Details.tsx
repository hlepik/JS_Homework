import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IMessageForm } from "../../dto/IMessageForm";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";
import React, { useCallback } from 'react';
import Moment from 'moment';


const MessageFormDetails = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [messageForm, setMessageForm] = useState({} as IMessageForm);

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



    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <div>

            <h4>{appState.langResources.bllAppDTO.messageForms.message}</h4>
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
                    {appState.currentLanguage.name === "en" ?

                        <>
                            {Moment(messageForm.dateSent).format("YYYY.MM.DD HH:mm:ss")}
                        </>
                        :
                        <>
                            {Moment(messageForm.dateSent).format('DD.MM.YYYY HH:mm:ss')}
                        </>


                    }
                </dd>
                <hr />

                <p id='backToList'>
                    <Link to={'/messageForm'}>{appState.langResources.crud.index}</Link>
                </p>

            </dl>
            <Loader {...pageStatus} />
        </div>
    );
}

export default MessageFormDetails;