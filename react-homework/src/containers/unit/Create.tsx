import { BaseService } from "../../services/base-service";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";


const UnitCreate = () => {

    const appState = useContext(AppContext);
    const [editData, setUnit] = useState({ name: ''});
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();

    const submitClicked = async (e: Event) => {

        e.preventDefault();

        if (editData.name.length < 2 || editData.name.length > 128) {
            setAlertMessage('The field Name must be a string or array type with a minimum length of 2.');

        } else {
            setAlertMessage('');
            console.log(editData)

            const url = '/Units';
            let response = await BaseService.post(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/unit')
            } else {
                setAlertMessage(response.messages![0]);
            }
        }
    }


    useEffect(() => {

    }, []);


    return (
        <>
            <h2>{appState.langResources.crud.create}</h2 >
            <h3>{appState.langResources.bllAppDTO.units.unit}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.units.name}</label>
                                <input value={editData.name} onChange={e => setUnit({ ...editData, name: e.target.value })} className="form-control" type="text" id="Input_UnitName" name="InputUnitName" placeholder={editData.name} autoComplete="current-name" />
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
        </>
    );
}

export default UnitCreate;