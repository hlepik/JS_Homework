import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IProductMaterial } from "../../dto/IProductMaterial";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';



const ProductMaterialIndex = () => {
    const appState = useContext(AppContext);
    const [productMaterials, setProductMaterial] = useState([] as IProductMaterial[]);
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
        let result = await BaseService.getAll<IProductMaterial>('/ProductMaterials', appState.token!);


        console.log(result);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductMaterial(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState])

    const deleteClicked = async (e: Event, id: string) => {

        e.preventDefault();

        console.log(id)
        let result = await BaseService.delete<IProductMaterial>('/ProductMaterials/' + id, appState.token!);

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
                        <tr>
                            <td>
                                {productMaterial.materialName}
                            </td>
                            <td>
                                {productMaterial.productName}
                            </td>
                            <td>
                                <Link to={'/productMaterial/' + productMaterial.id}>{appState.langResources.crud.details}</Link> |
                                 <Link to={'/productMaterial/edit/' + productMaterial.id}>{appState.langResources.crud.edit}</Link> |
                                 <span onClick={(e) => swal({ text: appState.langResources.crud.deleteConfirm, dangerMode: true }).then(willDelete => { if (willDelete) { deleteClicked(e.nativeEvent, productMaterial.id!) } })}>

                                    <span id="deleteButton" >
                                        {element}
                                    </span>
                                </span>
                            </td>
                        </tr>)}
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default ProductMaterialIndex;