import { BaseService } from "../../services/base-service";
import { Link } from "react-router-dom";
import { IProduct } from "../../dto/IProduct";
import {  useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';


const ProductIndex = () => {

    const appState = useContext(AppContext);
    const [products, setProduct] = useState([] as IProduct[] || '');
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
        let result = await BaseService.getAll<IProduct>('/Products?culture=' + appState.currentLanguage.name, appState.token!);
        console.log(result);
        console.log(appState)

        if (result.ok && result.data) {
            setProduct(result.data);
        }



    }, [appState])

    const deleteClicked = async (e: Event, id: string) => {

        e.preventDefault();

        console.log(id)
        let result = await BaseService.delete<IProduct>('/Products/' + id, appState.token!);

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
            <h1>{appState.langResources.bllAppDTO.products.product}</h1>

            <p>
                <Link to={'/products/create'}>{appState.langResources.crud.create}</Link>
            </p>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            {appState.langResources.bllAppDTO.products.description}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.products.color}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.products.hasTransport}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.products.isBooked}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.products.location}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.products.size}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.products.condition}
                        </th>
                        <th>
                            {appState.langResources.bllAppDTO.products.material}
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>

                        <tr key={product.id}>
                            <td>
                                {product.description}
                            </td>
                            <td>
                                {product.color}
                            </td>
                            <td>
                                <input type="checkbox" defaultChecked={product.hasTransport} disabled={true} />
                            </td>
                            <td>

                                <input type="checkbox" defaultChecked={product.isBooked} disabled={true} />
                            </td>
                            <td>

                                {product.countyName}

                                {product.cityName !== null && product.cityName !== "null" ?
                                    <>
                                        , {product.cityName}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                {product.locationDescription !== null ?
                                    <>
                                        , {product.locationDescription}
                                    </>
                                    :
                                    <>
                                    </>
                                }

                            </td>
                            <td>

                                {product.height !== null ?
                                    <>
                                        {appState.langResources.bllAppDTO.products.height}: {product.height}{product.unitName}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                {product.width !== null ?
                                    <>
                                        , {appState.langResources.bllAppDTO.products.width}: {product.width}{product.unitName}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                {product.depth !== null ?
                                    <>
                                        , {appState.langResources.bllAppDTO.products.depth}:  {product.depth}{product.unitName}
                                    </>
                                    :
                                    <>
                                    </>
                                }

                            </td>
                            <td>
                                {product.conditionName}
                            </td>
                            <td>

                                {product.material?.length! > 1 ?
                                    <>

                                        {product.material!.map(mat =>

                                            <div key={mat}>
                                                {mat}

                                            </div>
                                        )}
                                    </>
                                    :
                                    <>
                                        {product.material}
                                    </>
                                }

                            </td>

                            <td>
                                <Link to={'/products/edit/' + product.id}>{appState.langResources.crud.edit}</Link>

                                <br/>
                                    <Link to={'/products/' + product.id}>{appState.langResources.crud.details}</Link>
                              
                                <span onClick={(e) => swal({ text: appState.langResources.crud.deleteConfirm, dangerMode: true }).then(willDelete => { if (willDelete) { deleteClicked(e.nativeEvent, product.id!) } })}>

                                    <span id="deleteButton" >
                                        {element}
                                    </span>
                                </span>


                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </>

    );
}

export default ProductIndex;