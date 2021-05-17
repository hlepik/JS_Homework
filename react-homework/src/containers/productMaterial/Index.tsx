import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IProductMaterial } from "../../dto/IProductMaterial";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react';

const RowDisplay = (props: { productMaterial: IProductMaterial, appState: IAppState }) => (
    <tr>
        <td>
            {props.productMaterial.materialName}
        </td>
        <td>
            {props.productMaterial.productName}
        </td>
        <td>
            <Link to={'/productMaterial/' + props.productMaterial.id}>{props.appState.langResources.crud.details}</Link> |
            <Link to={'/productMaterial/edit/' + props.productMaterial.id}>{props.appState.langResources.crud.edit}</Link> |
            <Link to={'/productMaterial/delete/' + props.productMaterial.id}>{props.appState.langResources.crud.delete}</Link>
        </td>
    </tr>
);


const ProductMaterialIndex = () => {
    const appState = useContext(AppContext);
    const [productMaterials, setProductMaterial] = useState([] as IProductMaterial[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = useCallback(async () => {

        console.log(appState)
        let result = await BaseService.getAll<IProductMaterial>('/ProductMaterials', appState.token!);


        console.log(result);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductMaterial(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <>
            <h1>{appState.langResources.bllAppDTO.productMaterials.productMaterial}</h1>

            <p>
                <Link to={'/productMaterial/create'}>{appState.langResources.crud.create}</Link>
            </p>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                        {appState.langResources.bllAppDTO.materials.material}
                    </th>
                        <th>
                        {appState.langResources.bllAppDTO.products.product}
                    </th>

                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productMaterials.map(productMaterial =>
                        <RowDisplay productMaterial={productMaterial} key={productMaterial.id} appState={appState} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default ProductMaterialIndex;