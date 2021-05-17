import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IUserBookedProducts } from "../../dto/IUserBookedProducts";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react'


const RowDisplay = (props: { userBookings: IUserBookedProducts, appState: IAppState }) => (
    <tr>
        <td>
            {props.userBookings.description}
        </td>
        <td>
            {props.userBookings.timeBooked}
        </td>
        <td>
            {props.userBookings.until}
        </td>
        <td>
            {props.userBookings.email}
        </td>

        <td>

            <Link to={'/userBooked-Products/' + props.userBookings.id}>{props.appState.langResources.crud.details}</Link> |
            <Link to={'/userBooked-Products/delete/' + props.userBookings.id}>Delete</Link>
        </td>
    </tr>
);


const UserBookedProductsIndex = () => {

    const appState = useContext(AppContext);
    const [userBookings, setUserBookedProducts] = useState([] as IUserBookedProducts[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IUserBookedProducts>('/UserBookedProducts', appState.token!);
        console.log(result);
     
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUserBookedProducts(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])
    
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
                        <RowDisplay userBookings={userBookings} key={userBookings.id} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default UserBookedProductsIndex;