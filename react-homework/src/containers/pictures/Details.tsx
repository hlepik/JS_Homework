import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IPicture } from "../../dto/IPicture";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";
import { useHistory } from "react-router-dom";


const PictureDetails = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [picture, setPicture] = useState({} as IPicture);
    let history = useHistory();

    const loadData = async () => {
        console.log(id)

        let result = await BaseService.get<IPicture>('/Pictures/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPicture(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }

    const editClicked = async (e: Event) => {

        e.preventDefault();
        history.push('/pictures/Edit/' + id)

    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <h3>Details</h3>
            <h4>Picture</h4>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">Url</dt>

                <dd className="col-sm-10">
                    {picture.url}
                </dd>
                <dt className="col-sm-2">Product name</dt>

                <dd className="col-sm-10">
                    {picture.productName}
                </dd>
                <hr />

                <div id="button">
                    <button onClick={(e) => editClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Edit</button>
                    <p id='backToList'>
                        <Link to={'/pictures'}>Back to List</Link>
                    </p>
                </div>

            </dl>
        </div >
    );
}

export default PictureDetails;