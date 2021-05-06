import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { ICounty } from "../../dto/ICounty";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";




const CountyEdit = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setCounty] = useState({} as ICounty || '');
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();


    const loadData = async () => {
        console.log(id)

        let result = await BaseService.get<ICounty>('/Counties/' + id, appState.token!);


        console.log(result.data)
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCounty(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }
    const submitClicked = async (e: Event) => {

        e.preventDefault();

        console.log(editData.nameId)

        if (editData.name.length < 2 || editData.name.length > 128) {
            setAlertMessage('The field Name must be a string or array type with a minimum length of 2.');

        } else {
            setAlertMessage('');
            console.log(editData)

            const url = '/Counties/' + id;
            let response = await BaseService.edit(url, editData, appState.token!);

            console.log(response)

            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/county')
            } else {
                setAlertMessage(response.messages![0]);
            }
        }
    }


    useEffect(() => {
        loadData();
    }, []);


    return (
        <>
            <h2> Edit</h2 >
            <h3>County</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>Name</label>
                                <input value={editData.name || ''} onChange={e => setCounty({ ...editData, name: e.target.value })} className="form-control" type="text" id="Input_CountyName" name="Input.CountyName" placeholder={editData.name} autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Save</button>
                            </div>
                            <p>
                                <Link to={'/county'}>Back to List</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default CountyEdit;