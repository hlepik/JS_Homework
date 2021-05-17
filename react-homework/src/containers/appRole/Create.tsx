import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import { IAppRole } from "../../dto/IAppRole";
import Loader from "../../components/Loader";


const AppRoleCreate = () => {

    const appState = useContext(AppContext);
    const [pageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setAppRole] = useState({} as IAppRole);
    const [alertMessage, setAlertMessage] = useState('');

    let history = useHistory();

    const submitClicked = async (e: Event) => {

        e.preventDefault();

        setAlertMessage('');
        console.log(editData)

        const url = '/AppRole';
        let response = await BaseService.post(url, editData, appState.token!);

        console.log(response)
        if (response.statusCode >= 200 && response.statusCode < 400) {
            history.push('/appRole')
        } else {
            setAlertMessage('Error')
        }
    }

    useEffect(() => {

    }, []);

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
                                <input value={editData.name} onChange={e => setAppRole({ ...editData, name: e.target.value })} className="form-control" type="text" id="Input_Name" name="Input.Name" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appRole.normalizedName}</label>
                                <input value={editData.normalizedName} onChange={e => setAppRole({ ...editData, normalizedName: e.target.value })} className="form-control" type="text" id="Input_NormName" name="Input.NormName" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.appRole.concurrencyStamp}</label>
                                <input value={editData.concurrencyStamp} onChange={e => setAppRole({ ...editData, concurrencyStamp: e.target.value })} className="form-control" type="text" id="Input_Stamp" name="Input.Stamp" autoComplete="current-name" />
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

export default AppRoleCreate;