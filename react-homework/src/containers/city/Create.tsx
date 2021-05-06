import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { ICity } from "../../dto/ICity";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";


const CityCreate = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setCity] = useState({ name: ''});
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();



    const submitClicked = async (e: Event) => {

        e.preventDefault();

        if (editData.name.length < 2 || editData.name.length > 128) {
            setAlertMessage('The field Name must be a string or array type with a minimum length of 2.');

        } else {
            setAlertMessage('');
            console.log(editData)

            const url = '/Cities';
            let response = await BaseService.post(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/city')
            } else {
                setAlertMessage(response.messages![0]);
            }
        }
    }


    useEffect(() => {

    }, []);


    return (
        <>
            <h2>Create</h2 >
            <h3>City</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>Name</label>
                                <input value={editData.name} onChange={e => setCity({ ...editData, name: e.target.value })} className="form-control" type="text" id="Input_CityName" name="Input.CityName" placeholder={editData.name} autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Save</button>
                            </div>
                            <p>
                                <Link to={'/city'}>Back to List</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default CityCreate;