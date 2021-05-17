import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IPicture } from "../../dto/IPicture";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react';

const RowDisplay = (props: { picture: IPicture, appState: IAppState }) => (
    <tr>

        <td >
            <img src={props.picture.url} className='picture' alt='Pilt' />

        </td>
       
        <td>
            {props.picture.productName}
        </td>
        <td>
            <Link to={'/pictures/' + props.picture.id}>{props.appState.langResources.crud.details}</Link> |
            <Link to={'/pictures/edit/' + props.picture.id}>{props.appState.langResources.crud.edit}</Link> |
            <Link to={'/pictures/delete/' + props.picture.id}>Delete</Link>
        </td>
    </tr>
);


const PictureIndex = () => {
    const appState = useContext(AppContext);
    const [pictures, setPictures] = useState([] as IPicture[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {

        console.log(appState)
        let result = await BaseService.getAll<IPicture>('/Pictures', appState.token!);
        console.log(result);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPictures(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <>
            <h1>{appState.langResources.bllAppDTO.pictures.picture}</h1>
            {appState.token != null ?
                <>
                    <p>
                        <Link to={'/pictures/create'}>{appState.langResources.crud.create}</Link>
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
                        {appState.langResources.bllAppDTO.pictures.url}
                    </th>
                        <th>
                        {appState.langResources.bllAppDTO.pictures.productName}
                    </th>

                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pictures.map(picture =>
                        <RowDisplay picture={picture} key={picture.id} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default PictureIndex;