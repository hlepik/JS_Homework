import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IAppUser } from "../../dto/IAppUser";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";


const AppUserDetails = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [appUser, setAppUser] = useState({} as IAppUser);
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IAppUser>('/AppUser/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setAppUser(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])

    const editClicked = async (e: Event) => {

        e.preventDefault();
        history.push('/appUser/Edit/' + id)

    }

    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <>
            <h1>{appState.langResources.crud.details}</h1>

            <div>
                <h4>{appState.langResources.appUser.appUser}</h4>
                <hr />

                <dl className="row">
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.firstname}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.firstname}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.lastname}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.lastname}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.username}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.username}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.normalizedUserName}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.normalizedUserName}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.email}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.email}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.normalizedEmail}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.normalizedEmail}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.emailConfirmed}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.emailConfirmed}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.passwordHash}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.passwordHash}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.securityStamp}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.securityStamp}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.concurrencyStamp}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.concurrencyStamp}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.phoneNumber}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.phoneNumber}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.phoneNumberConfirmed}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.phoneNumberConfirmed}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.twoFactorEnabled}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.twoFactorEnabled}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.lockoutEnd}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.lockoutEnd}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.lockoutEnabled}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.lockoutEnabled}
                    </dd>
                    <dt className="col-sm-2">
                        {appState.langResources.appUser.accessFailedCount}
                    </dt>
                    <dd className="col-sm-10">
                        {appUser.accessFailedCount}
                    </dd>
                </dl>
            </div>
            <div className="form-group" >
                <div id="button">
                    <button onClick={(e) => editClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.crud.edit}</button>
                    <p id='backToList'>
                        <Link to={'/appUser'}>{appState.langResources.crud.index}</Link>
                    </p>
                </div>

            </div>
               <Loader {...pageStatus} />
        </>

    );
}

export default AppUserDetails;