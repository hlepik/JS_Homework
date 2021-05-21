import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IPicture } from "../../dto/IPicture";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';


const PictureIndex = () => {
    const appState = useContext(AppContext);
    const [pictures, setPictures] = useState([] as IPicture[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const element = <FontAwesomeIcon icon={faTrash} />


    const loadData = useCallback(async () => {

        let data = window.localStorage.getItem('state');
        window.localStorage.clear();

        if (data != null) {
            let state = JSON.parse(data);
            console.log(state)
            appState.currentLanguage = state.currentLanguage;
            appState.supportedLanguages = state.supportedLanguages;
            appState.langResources = state.langResources;
            console.log(appState)
            appState.setAuthInfo(state.token, state.firstName, state.lastName);
        }

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

    const deleteClicked = async (e: Event, id: string) => {

        e.preventDefault();

        console.log(id)
        let result = await BaseService.delete<IPicture>('/Pictures/' + id, appState.token!);


        if (result.ok) {
            window.localStorage.setItem('state', JSON.stringify(appState));
            window.location.reload();
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

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
                        <tr>

                            <td >
                                <img src={picture.url} className='picture' alt='Pilt' />

                            </td>

                            <td>
                                {picture.productName}
                            </td>
                            <td>
                                <Link to={'/pictures/' + picture.id}>{appState.langResources.crud.details}</Link> |
                                <Link to={'/pictures/edit/' + picture.id}>{appState.langResources.crud.edit}</Link> |

                                <span  onClick={(e) => swal({text: appState.langResources.crud.deleteConfirm, dangerMode: true}).then(willDelete => {if(willDelete){deleteClicked(e.nativeEvent, picture.id!)}})}>

                                   <span id="deleteButton" >
                                    {element}
                                    </span>
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default PictureIndex;