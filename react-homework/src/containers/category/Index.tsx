import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ICategory } from "../../dto/ICategory";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react';

const RowDisplay = (props: { category: ICategory, role: string, appState: IAppState }) => (
    <tr>
        <td>
            {props.category.name}
        </td>

        <td>
            <Link to={'/category/edit/' + props.category.id}>{props.appState.langResources.crud.edit}</Link> |

            <Link to={'/category/' + props.category.id}>{props.appState.langResources.crud.details}</Link>
        </td>
    </tr>
);


const CategoryIndex = () => {

    const appState = useContext(AppContext);
    const [categories, setCategories] = useState([] as ICategory[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {

       
        let result = await BaseService.getAll<ICategory>('/Categories?culture=' + appState.currentLanguage.name, appState.token!);
        console.log(result);
        console.log(appState)

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCategories(result.data);
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
            <h1>{appState.langResources.bllAppDTO.categories.category}</h1>

            {role === 'Admin' ?

                <p>
                    <Link to={'/category/create'}>{appState.langResources.crud.create}</Link>
                </p>

                :
                <>
                </>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>
                        {appState.langResources.bllAppDTO.categories.name}
                    </th>

                    </tr>
                </thead>
                <tbody>
                    {categories.map(category =>
                        <RowDisplay category={category} key={category.id} role={role} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default CategoryIndex;