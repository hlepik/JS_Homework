import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IProduct } from "../../dto/IProduct";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import React, { useCallback } from 'react';


const ProductDetails = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [product, setProduct] = useState({} as IProduct|| '');
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IProduct>('/Products/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProduct(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])

    const editClicked = async (e: Event) => {

        e.preventDefault();
        history.push('/product/Edit/' + id)

    }

    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <div>
            <h3>{appState.langResources.crud.details}</h3>
            <h4>{appState.langResources.bllAppDTO.products.product}</h4>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.description}</dt>

                <dd className="col-sm-10">
                    {product.description || ''}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.color}</dt>

                <dd className="col-sm-10">
                    {product.color || ''}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.productAge}</dt>

                <dd className="col-sm-10">
                    {product.productAge || ''}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.isBooked}</dt>

                <dd className="col-sm-10">
                <input type="checkbox" defaultChecked={product.isBooked} disabled={true}/>

                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.hasTransport}</dt>

                <dd className="col-sm-10">
                <input type="checkbox" defaultChecked={product.hasTransport} disabled={true}/>

                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.height}</dt>

                <dd className="col-sm-10">
                    {product.height || ''}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.width}</dt>

                <dd className="col-sm-10">
                    {product.width || ''}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.depth}</dt>

                <dd className="col-sm-10">
                    {product.depth || ''}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.county}</dt>

                <dd className="col-sm-10">
                    {product.county || ''}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.city}</dt>

                <dd className="col-sm-10">
                    {product.city || ''}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.category}</dt>

                <dd className="col-sm-10">
                    {product.category || ''}
                </dd>
                <hr />

                <div className="form-group" >
                <div id="button">
                        <button onClick={(e) => editClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                        <p id='backToList'>
                        <Link to={'/products'}>{appState.langResources.crud.index}</Link> 
                        </p>
                    </div>

                </div>

            </dl>
            <Loader {...pageStatus} />
        </div>
    );
}

export default ProductDetails;