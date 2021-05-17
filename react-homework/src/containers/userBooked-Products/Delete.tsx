import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IUserBookedProducts } from "../../dto/IUserBookedProducts";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import React, { useCallback } from 'react'
import Loader from "../../components/Loader";

const UserBookedProductsDelete = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [userBookings, setUserBookedProducts] = useState({} as IUserBookedProducts);
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IUserBookedProducts>('/UserBookedProducts/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUserBookedProducts(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])

    const deleteClicked = async (e: Event) => {

        e.preventDefault();
        let result = await BaseService.delete<IUserBookedProducts>('/UserBookedProducts/' + id, appState.token!);


        if (result.ok ) {
            history.push('/userBookedProducts');
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
     

    }

    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <div>
            <h3>{appState.langResources.crud.delete}</h3>
            <h2>{appState.langResources.crud.confirmation}</h2>
            <h3>{appState.langResources.bllAppDTO.userBookedProduct.userBookedProducts}</h3>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.description}</dt>

                <dd className="col-sm-10">
                    {userBookings.description}
                </dd>
               
                <hr />

                <div className="form-group" >
                    <div id="button">
                        <button onClick={(e) => deleteClicked(e.nativeEvent)} type="submit" className="btn btn-danger">{appState.langResources.crud.delete}</button>
                        <p id="backToList">
                            <Link to={'/userBooked-Products'}>{appState.langResources.crud.index}</Link>
                        </p>
                    </div>

                </div>

            </dl>
            <Loader {...pageStatus} />
        </div>
    );
}

export default UserBookedProductsDelete;