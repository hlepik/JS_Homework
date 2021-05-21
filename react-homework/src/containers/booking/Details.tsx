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
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [products, setProduct] = useState({} as IProduct || '');
    const productId = props.location.state.data;

    const loadData = useCallback(async () => {
        console.log(productId)

        let result = await BaseService.get<IProduct>('/Products/' + productId + '?culture=' + appState.currentLanguage.name);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProduct(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [productId, appState.currentLanguage.name])



    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <>

            <dt className="col-sm-2">
            <h2>{appState.langResources.bllAppDTO.pictures.picture}</h2>
                </dt>
            <th id='pictureLayout'>
                {products.pictureUrls?.map(picture =>

                    <div key={products.id}>
                        <img src={picture} className='pictureIndex' key={picture} alt='Pilt' />

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