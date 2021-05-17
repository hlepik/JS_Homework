import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ICondition } from "../../dto/ICondition";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react';

const RowDisplay = (props: { condition: ICondition, role: string, appState: IAppState }) => (
    <tr>
        <td>
            {props.condition.description}
        </td>

        <td>
            <Link to={'/condition/edit/' + props.condition.id}>{props.appState.langResources.crud.edit}</Link> |

            <Link to={'/condition/' + props.condition.id}>{props.appState.langResources.crud.details}</Link>
        </td>
    </tr>
);


const ConditionIndex = () => {

    const appState = useContext(AppContext);
    const [conditions, setCondition] = useState([] as ICondition[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<ICondition>('/Conditions', appState.token!);
        console.log(result);
        console.log(appState)

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCondition(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    useEffect(() => {
        loadData();
    }, [loadData]);
    let role: string = '';
    if (appState.token != null) {
        const info = JSON.parse(atob(appState.token!.split('.')[1]));
        role = info["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

    return (
        <>
            <h1>{appState.langResources.bllAppDTO.conditions.condition}</h1>

            {role === 'Admin' ?

                <p>
                    <Link to={'/condition/create'}>{appState.langResources.crud.create}</Link>
                </p>

                :
                <>
                </>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>
                        {appState.langResources.bllAppDTO.conditions.description}
                    </th>

                    </tr>
                </thead>
                <tbody>
                    {conditions.map(condition =>
                        <RowDisplay condition={condition} key={condition.id} role={role} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default ConditionIndex;