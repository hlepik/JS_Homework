import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IUserBookedProducts } from "../../dto/IUserBookedProducts";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import Moment from 'moment';


const UserBookedProductsIndex = () => {

    const appState = useContext(AppContext);
    const [userBookings, setUserBookedProducts] = useState([] as IUserBookedProducts[] || '');
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
        let result = await BaseService.getAll<IUserBookedProducts>('/UserBookedProducts', appState.token!);
        console.log(result);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUserBookedProducts(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    const deleteClicked = async (e: Event, id: string) => {

        e.preventDefault();

        console.log(id)

        let result = await BaseService.delete<IUserBookedProducts>('/UserBookedProducts/' + id, appState.token!);

        if (result.ok) {
            window.localStorage.setItem('state', JSON.stringify(appState));
            window.location.reload();
        }
    }

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <>


            <table className="table">
                <thead>
                    <tr>
                        <th>
                            {appState.langResources.bllAppDTO.products.description}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.bookings.timeBooked}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.bookings.until}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.userBookedProduct.productOwner}
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {userBookings.map(userBookings =>
                        <tr key={userBookings.id}>
                            <td>
                                {userBookings.description}
                            </td>
                            <td>
                                {appState.currentLanguage.name === "en" ?

                                    <>
                                        {Moment(userBookings.timeBooked).format("YYYY.MM.DD HH:mm:ss")}
                                    </>
                                    :
                                    <>
                                        {Moment(userBookings.timeBooked).format('DD.MM.YYYY HH:mm:ss')}
                                    </>


                                }
                            </td>
                            <td>
                                {appState.currentLanguage.name === "en" ?

                                    <>
                                        {Moment(userBookings.until).format("YYYY.MM.DD")}
                                    </>
                                    :
                                    <>
                                        {Moment(userBookings.until).format('DD.MM.YYYY')}
                                    </>


                                }
                            </td>
                            <td>
                                {userBookings.email}
                            </td>

                            <td>

                                <Link to={'/userBooked-Products/' + userBookings.id}>{appState.langResources.crud.details}</Link> |
                                <span onClick={(e) => swal({ text: appState.langResources.crud.deleteConfirm, dangerMode: true }).then(willDelete => { if (willDelete) { deleteClicked(e.nativeEvent, userBookings.id!) } })}>

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

export default UserBookedProductsIndex;