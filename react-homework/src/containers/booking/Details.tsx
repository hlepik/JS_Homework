import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IProduct } from "../../dto/IProduct";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";


const BookingDetails = (props: any) => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [products, setProduct] = useState({} as IProduct || '');
    const productId = props.location.state.data;

    const loadData = useCallback(async () => {
        console.log(productId)

        let result = await BaseService.get<IProduct>('/Products/' + productId);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProduct(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [productId])



    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <>


            <dt className="col-sm-2">
            {appState.langResources.bllAppDTO.pictures.picture}
                </dt>
            <th id="alignCentre">
                {products.pictureUrls?.map(picture =>

                    <div >
                        <img src={picture} className='picture' alt='Pilt'/>

                    </div>


                )}

            </th>

            < p >
                <Link to={'/booking'}>{appState.langResources.crud.index}</Link>
            </p>
            <Loader {...pageStatus} />
        </>

    );

}

export default BookingDetails;