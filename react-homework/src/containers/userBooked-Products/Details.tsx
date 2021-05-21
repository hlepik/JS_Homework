import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IUserBookedProducts } from "../../dto/IUserBookedProducts";
import { IProduct } from "../../dto/IProduct";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react'
import Loader from "../../components/Loader";



const UserBookedProductsDetails = () => {

    //get the router params
    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [product, setProduct] = useState({} as IProduct || '');


    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IUserBookedProducts>('/UserBookedProducts/' + id, appState.token!);
        var productId = '';


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            productId = result.data.productId;
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

        let productResult = await BaseService.get<IProduct>('/Products/' + productId, appState.token!);
        if (productResult.ok && productResult.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProduct(productResult.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: productResult.statusCode });
        }

    }, [appState, id])


    useEffect(() => {
        loadData();
    }, [loadData]);
    return (
        <>


            <div key={product.id} className="mainView">
                <div className="boxLayout">


                    <tr>
                        <th id="alignCentre">
                            {product.pictureUrls?.slice(product.pictureUrls.length - 1).map(picture =>

                                <div >
                                    <img src={picture} key={picture} className='picture' alt='Pilt' />

                                </div>


                            )}

                        </th>


                        <div className="boxLayout" id="box4">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.description}:</td>
                                        <td>{product.description}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.county}:</td>
                                        <td>{product.countyName}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.city}:</td>
                                        <td>{product.cityName}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.locationDescription}:</td>
                                        <td>{product.locationDescription}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="boxLayout" id="box2">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.category}:</td>
                                        <td>{product.categoryName}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.color}:</td>
                                        <td>{product.color}</td>
                                    </tr>

                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.width}:</td>
                                        <td>{product.width}{product.unitName}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.height}:</td>
                                        <td>{product.height}{product.unitName}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.depth}:</td>
                                        <td>{product.depth}{product.unitName}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="boxLayout" id="box3">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.hasTransport}</td>
                                        <td>
                                            <input type="checkbox" defaultChecked={product.hasTransport} disabled={true} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.isBooked}</td>
                                        <td>
                                            <input type="checkbox" defaultChecked={product.isBooked} disabled={true} />
                                        </td>

                                    </tr>

                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.condition}:</td>
                                        <td>{product.conditionName}</td>
                                    </tr>

                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.productAge}:</td>
                                        <td>{product.productAge}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.material}:</td>
                                        {product.material?.map(material =>

                                            <td>{material}</td>
                                        )}

                                    </tr>
                                </tbody>
                            </table>

                        </div>


                    </tr>


                </div>
                <p id='backToList'>
                    <Link to={'/userBooked-Products'}>{appState.langResources.crud.index}</Link>
                </p>
            </div>

            <Loader {...pageStatus} />
        </>
    );
}

export default UserBookedProductsDetails;