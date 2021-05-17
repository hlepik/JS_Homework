import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IAppRole } from "../../dto/IAppRole";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react';

const RowDisplay = (props: { role: IAppRole}) => (
    <tr>
        <td>
            {props.role.name}
        </td>
        <td>
            {props.role.normalizedName}
        </td>
        <td>
            {props.role.concurrencyStamp}
        </td>
        <td>
            <Link to={'/appRole/' + props.role.id}>Details</Link> |
            <Link to={'/appRole/edit/' + props.role.id}>Edit</Link> |
            <Link to={'/appRole/delete/' + props.role.id}>Delete</Link>|
            <Link to={'/appRole/change/'+ props.role.id}>Change</Link>
        </td>
    </tr>
);


const AppRoleIndex = () => {
    const appState = useContext(AppContext);
    const [appRole, setAppRole] = useState([] as IAppRole[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = useCallback(async () => {

        console.log(appState)
        let result = await BaseService.getAll<IAppRole>('/AppRole', appState.token!);
        console.log(result);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setAppRole(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <>

            <p>
                <Link to={'/appRole/create'}>{appState.langResources.crud.create}</Link>
            </p>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                           {appState.langResources.appRole.name}
                    </th>
                        <th>
                        {appState.langResources.appRole.normalizedName}
                    </th>
                    <th>
                    {appState.langResources.appRole.concurrencyStamp}
                    </th>
                   
                    </tr>
                </thead>
                <tbody>
                    {appRole.map(role =>
                        <RowDisplay role={role} key={role.id} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default AppRoleIndex;