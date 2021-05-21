import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { ICategory } from "../../dto/ICategory";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";

const CategoryEdit = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setCategory] = useState({} as ICategory || '');
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)
        console.log(appState.currentLanguage.name)

        let result = await BaseService.get<ICategory>('/Categories/' + id + '?culture=' + appState.currentLanguage.name, appState.token!);

        console.log(result.data)
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCategory(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])
    const submitClicked = async (e: Event) => {

        e.preventDefault();

        console.log(editData)
        if (editData.name.length < 2 || editData.name.length > 128) {
            setAlertMessage(appState.langResources.common.minLength);
        } else {
            setAlertMessage('');
            console.log(editData)

            const url = '/Categories/' + id + '?culture=' + appState.currentLanguage.name;
            let response = await BaseService.edit(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/category')
            } else {
                setAlertMessage("Error");
            }
        }
    }


    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <>
            <h2>{appState.langResources.crud.edit}</h2 >
            <h3>{appState.langResources.bllAppDTO.categories.category}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.categories.name}</label>
                                <input value={editData.name || ''} onChange={e => setCategory({ ...editData, name: e.target.value })} className="form-control" type="text" id="Input_CategoryName" name="Input.CategoryName" placeholder={editData.name} autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                            </div>
                            <p>
                                <Link to={'/category'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}

export default CategoryEdit;