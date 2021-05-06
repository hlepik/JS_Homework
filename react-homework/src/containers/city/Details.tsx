import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { ICity } from "../../dto/ICity";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";
import { useHistory } from "react-router-dom";


const CityDetails = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [city, setCity] = useState({} as ICity || '');
    let history = useHistory();

    const loadData = async () => {
        console.log(id)

        let result = await BaseService.get<ICity>('/Cities/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCity(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }

    const editClicked = async (e: Event) => {

        e.preventDefault();
        history.push('/city/Edit/' + id)

    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <h3>Details</h3>
            <h4>City</h4>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">Name</dt>

                <dd className="col-sm-10">
                    {city.name || ''}
                </dd>
                <hr />

                <div className="form-group" >
                <div id="button">
                        <button onClick={(e) => editClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Edit</button>
                        <p id='backToList'>
                        <Link to={'/city'}>Back to List</Link> 
                        </p>
                    </div>

                </div>

            </dl>
        </div>
    );
}

export default CityDetails;