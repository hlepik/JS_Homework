import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IProductMaterial } from "../../dto/IProductMaterial";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import React, { useCallback } from 'react';


const ProductMaterialDetails = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [productMaterial, setProductMaterial] = useState({} as IProductMaterial);
    let history = useHistory();

    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IProductMaterial>('/ProductMaterials/' + id, appState.token!);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductMaterial(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id]);

    const editClicked = (e: Event) => {

        e.preventDefault();
        history.push('/productMaterial/Edit/' + id)

    }


    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <div>
            <h3>{appState.langResources.crud.details}</h3>
            <h4>{appState.langResources.bllAppDTO.productMaterials.productMaterial}</h4>
            <hr />
            <dl className="row">
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.materials.material}</dt>

                <dd className="col-sm-10">
                    {productMaterial.materialName}
                </dd>
                <dt className="col-sm-2">{appState.langResources.bllAppDTO.products.product}</dt>

                <dd className="col-sm-10">
                    {productMaterial.productName}
                </dd>
                <hr />

                <div id="button">
                    <button onClick={(e) => editClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.crud.edit}</button>
                    <p id='backToList'>
                        <Link to={'/productMaterial'}>{appState.langResources.crud.index}</Link>
                    </p>
                </div>

            </dl>
            <Loader {...pageStatus} />
        </div >
    );
}

export default ProductMaterialDetails;