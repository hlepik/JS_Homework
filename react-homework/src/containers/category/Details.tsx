import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { ICategory } from "../../dto/ICategory";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";

const CategoryDetails = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [category, setCategory] = useState({} as ICategory || '');
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<ICategory>('/Categories/' + id + '?culture=' + appState.currentLanguage.name, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCategory(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])

    const editClicked = async (e: Event) => {

        e.preventDefault();
        history.push('/category/Edit/' + id)

    }

    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <div>
            <h3>{appState.langResources.crud.details}</h3>
            <h4>{appState.langResources.bllAppDTO.categories.category}</h4>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.categories.name}</dt>

                <dd className="col-sm-10">
                    {category.name || ''}
                </dd>
                <hr />

                <div className="form-group" >
                <div id="button">
                        <button onClick={(e) => editClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.crud.edit}</button>
                        <p id='backToList'>
                        <Link to={'/category'}>{appState.langResources.crud.index}</Link> 
                        </p>
                    </div>

                </div>

            </dl>
            <Loader {...pageStatus} />
        </div>
    );
}

export default CategoryDetails;