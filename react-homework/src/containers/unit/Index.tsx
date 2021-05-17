import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IUnit } from "../../dto/IUnit";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react'


const RowDisplay = (props: { unit: IUnit, role: string, appState: IAppState }) => (
    <tr>
        <td>
            {props.unit.name}
        </td>

        <td>
            <Link to={'/unit/edit/' + props.unit.id}>{props.appState.langResources.crud.edit}</Link> |

            <Link to={'/unit/' + props.unit.id}>{props.appState.langResources.crud.details}</Link>
        </td>
    </tr>
);


const UnitIndex = () => {

    const appState = useContext(AppContext);
    const [units, setUnits] = useState([] as IUnit[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IUnit>('/Units', appState.token!);
        console.log(result);
        console.log(appState)

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUnits(result.data);
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
            <h1>{appState.langResources.bllAppDTO.units.unit}</h1>

            {role === 'Admin' ?

                <p>
                    <Link to={'/unit/create'}>{appState.langResources.crud.create}</Link>
                </p>

                :
                <>
                </>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>
                        {appState.langResources.bllAppDTO.units.name}
                    </th>

                    </tr>
                </thead>
                <tbody>
                    {units.map(unit =>
                        <RowDisplay unit={unit} key={unit.id} role={role} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default UnitIndex;