import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IAppRole} from "../../dto/IAppRole";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";


const AppRoleEdit = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setAppRole] = useState({} as IAppRole);
    const [alertMessage, setAlertMessage] = useState('');
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
    const submitClicked = async (e: Event) => {

        e.preventDefault();

        setAlertMessage('');
        console.log(editData)

        const url = '/AppRole/' + id;
        let response = await BaseService.edit(url, editData, appState.token!);

        console.log(response)
        if (response.statusCode >= 200 && response.statusCode < 400) {
            history.push('/appRole')
        } else {
            setAlertMessage(response.messages![0]);
       
        }
    }

    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <>
            <h2>{appState.langResources.crud.edit}</h2 >
            <h3>{appState.langResources.appRole.appRole}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.appRole.name}</label>
                                <input value={editData.name || ''} onChange={e => setAppRole({ ...editData, name: e.target.value })} className="form-control" type="text" id="Input_Name" name="Input.Name" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appRole.normalizedName}</label>
                                <input value={editData.normalizedName || ''} onChange={e => setAppRole({ ...editData, normalizedName: e.target.value })} className="form-control" type="text" id="Input_NormName" name="Input.NormName" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appRole.concurrencyStamp}</label>
                                <input value={editData.concurrencyStamp || ''} onChange={e => setAppRole({ ...editData, concurrencyStamp: e.target.value })} className="form-control" type="text" id="Input_Stamp" name="Input.Stamp" autoComplete="current-name" />
                            </div>
                            
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                            </div>
                            <p>
                                <Link to={'/appRole'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
            <Loader {...pageStatus} />

        </>
    );
}

export default AppRoleEdit;