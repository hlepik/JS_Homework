import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IAppUser } from "../../dto/IAppUser";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";


const PictureEdit = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setAppUser] = useState({} as IAppUser);
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();


    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IAppUser>('/AppUser/' + id, appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setAppUser(result.data);


        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])
    const submitClicked = async (e: Event) => {

        e.preventDefault();

        setAlertMessage('');
        console.log(editData)

        const url = '/AppUser/' + id;
        let response = await BaseService.edit(url, editData, appState.token!);

        console.log(response)
        if (response.statusCode >= 200 && response.statusCode < 400) {
            history.push('/appUser')
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
            <h3>{appState.langResources.appUser.appUser}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.appUser.firstname}</label>
                                <input value={editData.firstname || ''} onChange={e => setAppUser({ ...editData, firstname: e.target.value })} className="form-control" type="text" id="Input_Firstname" name="Input.Firstname" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.lastname}</label>
                                <input value={editData.lastname || ''} onChange={e => setAppUser({ ...editData, lastname: e.target.value })} className="form-control" type="text" id="Input_Lastname" name="Input.Lastname" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.username}</label>
                                <input value={editData.username || ''} onChange={e => setAppUser({ ...editData, username: e.target.value })} className="form-control" type="text" id="Input_Username" name="Input.Username" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.normalizedUserName}</label>
                                <input value={editData.normalizedUserName || ''} onChange={e => setAppUser({ ...editData, normalizedUserName: e.target.value })} className="form-control" type="text" id="Input_NormN" name="Input.NormN" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.email}</label>
                                <input value={editData.email || ''} onChange={e => setAppUser({ ...editData, email: e.target.value })} className="form-control" type="text" id="Input_Email" name="Input.Email" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.normalizedEmail}</label>
                                <input value={editData.normalizedEmail || ''} onChange={e => setAppUser({ ...editData, normalizedEmail: e.target.value })} className="form-control" type="text" id="Input_NormEmail" name="Input.NormEmail" autoComplete="current-name" />
                            </div>
                            <div className="form-group form-check">
                                <input checked={editData.emailConfirmed} onChange={e => setAppUser({ ...editData, emailConfirmed: e.target.checked })} type="checkbox" className="form-check-input" id="EmailConf" />
                                <label className="form-check-label" htmlFor="formInputCheckBox">{appState.langResources.appUser.emailConfirmed}</label>
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.passwordHash}</label>
                                <input value={editData.passwordHash || ''} onChange={e => setAppUser({ ...editData, passwordHash: e.target.value })} className="form-control" type="text" id="Input_PassHash" name="Input.PassHash" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.securityStamp}</label>
                                <input value={editData.securityStamp|| ''} onChange={e => setAppUser({ ...editData, securityStamp: e.target.value })} className="form-control" type="text" id="Input_SecStamp" name="Input.SecStamp" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.concurrencyStamp}</label>
                                <input value={editData.concurrencyStamp || ''} onChange={e => setAppUser({ ...editData, concurrencyStamp: e.target.value })} className="form-control" type="text" id="Input_Con" name="Input.Con" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.phoneNumber}</label>
                                <input value={editData.phoneNumber || ''} onChange={e => setAppUser({ ...editData, phoneNumber: e.target.value })} className="form-control" type="text" id="Input_Phone" name="Input.Phone" autoComplete="current-name" />
                            </div>
                            <div className="form-group form-check">
                                <input checked={editData.phoneNumberConfirmed} onChange={e => setAppUser({ ...editData, phoneNumberConfirmed: e.target.checked })} type="checkbox" className="form-check-input" id="phoneConfirmed" />
                                <label className="form-check-label" htmlFor="formInputCheckBox">{appState.langResources.appUser.phoneNumberConfirmed}</label>
                            </div>
                            <div className="form-group form-check">
                                <input checked={editData.twoFactorEnabled} onChange={e => setAppUser({ ...editData, twoFactorEnabled: e.target.checked })} type="checkbox" className="form-check-input" id="formInputCheckBoxEnabled" />
                                <label className="form-check-label" htmlFor="formInputCheckBox">{appState.langResources.appUser.twoFactorEnabled}</label>
                            </div>
                            
                            <div className="form-group">
                                <label>{appState.langResources.appUser.lockoutEnabled}</label>
                                <input checked={editData.lockoutEnabled} onChange={e => setAppUser({ ...editData, lockoutEnabled: e.target.checked })} className="form-control" type="checkbox" id="Input_LEnabled" name="Input.LEnabled" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appUser.accessFailedCount}</label>
                                <input value={editData.accessFailedCount|| 0} onChange={e => setAppUser({ ...editData, accessFailedCount: e.target.valueAsNumber })} className="form-control" type="number" id="Input_Count" name="Input.COunt" autoComplete="current-name" />
                            </div>
                         
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                            </div>
                            <p>
                                <Link to={'/appUser'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}

export default PictureEdit;