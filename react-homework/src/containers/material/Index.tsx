import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IMaterial } from "../../dto/IMaterial";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react';


const RowDisplay = (props: { material: IMaterial, role: string, appState: IAppState}) => (

    <tr>
        <td>
            {props.material.name}
        </td>


        { props.role === 'Admin' ?
            <>
                <td>
                    <Link to={'/material/edit/' + props.material.id}>{props.appState.langResources.crud.edit}</Link> |
                    <Link to={'/material/' + props.material.id}>{props.appState.langResources.crud.details}</Link>
                </td>

            </>
            :
            <>
                <td>
                    <Link to={'/material/' + props.material.id}>{props.appState.langResources.crud.details}</Link>
                </td>
            </>
        }
    </tr>
);



const MaterialIndex = () => {

    const appState = useContext(AppContext);
    const [materials, setCounties] = useState([] as IMaterial[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IMaterial>('/Materials?culture=' + appState.currentLanguage.name, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCounties(result.data);
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
            <h1>{appState.langResources.bllAppDTO.materials.material}</h1>
            {appState.token != null && role === 'Admin' ?

                <p>
                    <Link to={'/material/create'}>{appState.langResources.crud.create}</Link>
                </p>

                :
                <>
                </>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>
                        {appState.langResources.bllAppDTO.materials.name}
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {materials.map(material =>
                        <RowDisplay material={material} key={material.id} role={role} appState={appState}/>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default MaterialIndex;