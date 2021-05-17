import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IUserMessages } from "../../dto/IUserMessages";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import React, { useCallback } from 'react'


const UserMessagesDelete = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [userMessage, setUserMessages] = useState({} as IUserMessages);
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IUserMessages>('/UserMessages/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUserMessages(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])

    const deleteClicked = async (e: Event) => {

        e.preventDefault();
        let result = await BaseService.delete<IUserMessages>('/UserMessages/' + id, appState.token!);


        if (result.ok) {
            history.push('/userMessages');
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
            <h3> {appState.langResources.bllAppDTO.userMessage.userMessages}</h3>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.userMessage.from}</dt>

                <dd className="col-sm-10">
                    {userMessage.senderEmail}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.userMessage.subject}</dt>

                <dd className="col-sm-10">
                    {userMessage.subject}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.userMessage.message}</dt>

                <dd className="col-sm-10">
                    {userMessage.message}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.userMessage.dateSent}</dt>

                <dd className="col-sm-10">
                    {userMessage.dateSent}
                </dd>
                <hr />

                <div className="form-group" >
                    <div id="button">
                        <button onClick={(e) => deleteClicked(e.nativeEvent)} type="submit" className="btn btn-danger">{appState.langResources.crud.delete}</button>
                        <p id="backToList">
                            <Link to={'/userMessages'}>{appState.langResources.crud.index}</Link>
                        </p>
                    </div>

                </div>
                <Loader {...pageStatus} />

            </dl>
 
        </div>
    );
}

export default UserMessagesDelete;