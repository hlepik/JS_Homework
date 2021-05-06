import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IPicture } from "../../dto/IPicture";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";
import { useHistory } from "react-router-dom";


const PictureDelete = () => {

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

    const deleteClicked = async (e: Event) => {

        e.preventDefault();
        let result = await BaseService.delete<IPicture>('/Pictures/' + id, appState.token!);


        if (result.ok ) {
            history.push('/pictures');
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
     

    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <h3>Details</h3>
            <h2>Are you sure you want to delete this?</h2>
            <h3>Picture</h3>
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

                <div className="form-group" >
                    <div id="button">
                        <button onClick={(e) => deleteClicked(e.nativeEvent)} type="submit" className="btn btn-danger">Delete</button>
                        <p id="backToList">
                            <Link to={'/pictures'}>Back to List</Link>
                        </p>
                    </div>

                </div>

            </dl>
        </div>
    );
}

export default PictureDelete;