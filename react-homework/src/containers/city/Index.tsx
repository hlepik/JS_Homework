import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ICity } from "../../dto/ICity";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState} from "../../context/AppContext";
import React, { useCallback } from 'react';

const RowDisplay = (props: { city: ICity, role: string, appState: IAppState }) => (
    <tr>
        <td>
            {props.city.name}
        </td>

        <td>
            <Link to={'/city/edit/' + props.city.id}>{props.appState.langResources.crud.edit}</Link> |

            <Link to={'/city/' + props.city.id}>{props.appState.langResources.crud.details}</Link>
        </td>
    </tr>
);


const CityIndex = () => {

    const appState = useContext(AppContext);
    const [cities, setCities] = useState([] as ICity[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<ICity>('/Cities?culture=' + appState.currentLanguage.name, appState.token!);
        console.log(result);
        console.log(appState)

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCities(result.data);
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
            <h1>{appState.langResources.bllAppDTO.cities.city}</h1>

            {role === 'Admin' ?

                <p>
                    <Link to={'/city/create'}>{appState.langResources.crud.create}</Link>
                </p>

                :
                <>
                </>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>
                        {appState.langResources.bllAppDTO.cities.name}
                    </th>

                    </tr>
                </thead>
                <tbody>
                    {cities.map(city =>
                        <RowDisplay city={city} key={city.id} role={role} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default CityIndex;