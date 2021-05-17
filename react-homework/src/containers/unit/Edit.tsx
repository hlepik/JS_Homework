import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IUnit } from "../../dto/IUnit";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import React, { useCallback } from 'react';


const UnitEdit = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setUnit] = useState({} as IUnit || '');
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IUnit>('/Units/' + id, appState.token!);

        console.log(result.data)
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUnit(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])


    
    const submitClicked = async (e: Event) => {

        e.preventDefault();

        console.log(editData)
        if (editData.name.length < 2 || editData.name.length > 128) {
            setAlertMessage('The field Name must be a string or array type with a minimum length of 2.');

        } else {
            setAlertMessage('');
            console.log(editData)

            const url = '/Units/' + id;
            let response = await BaseService.edit(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/unit')
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
            <h3>{appState.langResources.bllAppDTO.units.unit}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.units.name}</label>
                                <input value={editData.name || ''} onChange={e => setUnit({ ...editData, name: e.target.value })} className="form-control" type="text" id="Input_UnitName" name="Input.UnitName" placeholder={editData.name} autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                            </div>
                            <p>
                                <Link to={'/unit'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}

export default UnitEdit;