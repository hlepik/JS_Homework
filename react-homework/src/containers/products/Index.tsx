import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IProduct } from "../../dto/IProduct";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState } from "../../context/AppContext";
import React, { useCallback } from 'react';


const RowDisplay = (props: { product: IProduct, appState: IAppState }) => (
    <tr>
        <td>
            {props.product.description}
        </td>
        <td>
            {props.product.color}
        </td>
        <td>
            <input type="checkbox" defaultChecked={props.product.hasTransport} disabled={true} />
        </td>
        <td>

            <input type="checkbox" defaultChecked={props.product.isBooked} disabled={true} />
        </td>
        <td>

            {props.product.county}

            {props.product.city !== null && props.product.city !== "null" ?
                <>
                    , {props.product.city}
                </>
                :
                <>
                </>
            }
            {props.product.locationDescription !== null ?
                <>
                    , {props.product.locationDescription}
                </>
                :
                <>
                </>
            }

        </td>
        <td>

            {props.product.height !== null ?
                <>
                    {props.appState.langResources.bllAppDTO.products.height}: {props.product.height}{props.product.unit}
                </>
                :
                <>
                </>
            }
            {props.product.width !== null ?
                <>
                    , {props.appState.langResources.bllAppDTO.products.width}: {props.product.width}{props.product.unit}
                </>
                :
                <>
                </>
            }
            {props.product.depth !== null ?
                <>
                    , {props.appState.langResources.bllAppDTO.products.depth}:  {props.product.depth}{props.product.unit}
                </>
                :
                <>
                </>
            }

        </td>
        <td>
            {props.product.condition}
        </td>
        <td>

            {props.product.material?.length! > 1 ?
                <>

                    {props.product.material!.map(mat =>

                        <div key={mat}>
                           {mat}

                        </div>
                    )}
                </>
                :
                <>
                    {props.product.material}
                </>
            }

        </td>

        <td>
            <Link to={'/products/edit/' + props.product.id}>{props.appState.langResources.crud.edit}</Link> |

            <Link to={'/products/' + props.product.id}>{props.appState.langResources.crud.details}</Link>|
            <Link to={'/products/delete/' + props.product.id}>Delete</Link>
        </td>
    </tr>
);


const ProductIndex = () => {

    const appState = useContext(AppContext);
    const [products, setProduct] = useState([] as IProduct[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });


    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IProduct>('/Products', appState.token!);
        console.log(result);
        console.log(appState)

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProduct(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }


    }, [appState])


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
                        <RowDisplay product={product} key={product.id} appState={appState} />)
                    }
                </tbody>
            </table>

            <Loader {...pageStatus} />
        </>

    );
}

export default ProductIndex;