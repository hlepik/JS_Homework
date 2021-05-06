import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IPicture } from "../../dto/IPicture";
import { useContext, useEffect, useState } from "react";
import { data } from "jquery";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";

const RowDisplay = (props: { picture: IPicture }) => (
    <tr>
        <td>
            {props.picture.url}
        </td>
        <td>
            {props.picture.productName}
        </td>
        <td>
            <Link to={'/pictures/' + props.picture.id}>Details</Link> |
            <Link to={'/pictures/edit/' + props.picture.id}>Edit</Link> |
            <Link to={'/pictures/delete/' + props.picture.id}>Delete</Link>
        </td>
    </tr>
);


const PictureIndex = () => {
    const appState = useContext(AppContext);
    const [pictures, setPictures] = useState([] as IPicture[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData  = async () => {
       
        console.log(appState)
        let result = await BaseService.getAll<IPicture>('/Pictures', appState.token!);
        console.log(result);
        
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPictures(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }
    useEffect(() => {
        loadData();
    }, []);


    return (
        <>
        <h1>Pictures</h1>
        {appState.token != null ?
                <>
                    <p>
                        <Link to={'/pictures/create'}>Create</Link> 
                    </p>

                </>
                :
                <>
                </>
            }
        <table className="table">
            <thead>
                <tr>
                    <th>
                      Url
                    </th>
                    <th>
                      Product Name
                    </th>
                    
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {pictures.map(picture =>
                    <RowDisplay picture={picture} key={picture.id} />)
                }
            </tbody>
        </table>
        <Loader {...pageStatus} />
    </>

    );
}

export default PictureIndex;