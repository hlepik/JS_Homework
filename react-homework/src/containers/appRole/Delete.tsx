import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IAppRole } from "../../dto/IAppRole";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";


const AppRoleDelete = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [appRole, setAppRole] = useState({} as IAppRole);
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IAppRole>('/AppRole/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setAppRole(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])

    const deleteClicked = async (e: Event) => {

        e.preventDefault();
        let result = await BaseService.delete<IAppRole>('/AppRole/' + id, appState.token!);


        if (result.ok ) {
            history.push('/appRole');
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
     

    }

    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <div>
            <h3>{appState.langResources.crud.details}</h3>
            <h4>{appState.langResources.appRole.appRole}</h4>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">{appState.langResources.appRole.name}</dt>

                <dd className="col-sm-10">
                    {appRole.name}
                </dd>
                <dt className="col-sm-2">{appState.langResources.appRole.normalizedName}</dt>

                <dd className="col-sm-10">
                    {appRole.normalizedName}
                </dd>
                <dt className="col-sm-2">{appState.langResources.appRole.concurrencyStamp}</dt>

                <dd className="col-sm-10">
                    {appRole.concurrencyStamp}
                </dd>
                <hr />

                <div id="button">
                    <button onClick={(e) => deleteClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.crud.delete}</button>
                    <p id='backToList'>
                        <Link to={'/appRole'}>{appState.langResources.crud.index}</Link>
                    </p>
                </div>

            </dl>
            <Loader {...pageStatus} />

        </div >
    );
}

export default AppRoleDelete;