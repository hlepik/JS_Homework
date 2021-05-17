import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IProduct } from "../../dto/IProduct";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback } from 'react';


const SearchIndex = (props: any) => {


    const appState = useContext(AppContext);
    const [products, setProduct] = useState([] as IProduct[] || '');
    const list = useState([] as IProduct[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const city = props.location.state.data.city;
    const county = props.location.state.data.county;
    const category = props.location.state.data.category;
    let history = useHistory();
    const element = <FontAwesomeIcon icon={faCamera} />




    const loadData = async () => {

        let result = await BaseService.getAll<IProduct>('/Search', appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });

            console.log(result.data)
            list.push(result.data)

            if (city !== '' && county !== '' && category !== '') {
                var productsList = result.data.filter(a => a.city === city && a.county === county && a.category === category);
                setProduct(productsList);
            } else if (county !== '' && category !== '') {
                productsList = result.data.filter(a => a.county === county && a.category === category);
                setProduct(productsList);
            } else if (city !== '' && category !== '') {
                productsList = result.data.filter(a => a.city === city && a.category === category);
                setProduct(productsList);
            } else if (city !== '' && county !== '') {
                productsList = result.data.filter(a => a.city === city && a.county === county);
                setProduct(productsList);
            } else if (city !== '') {
                productsList = result.data.filter(a => a.city === city);
                setProduct(productsList);
            } else if (county !== '') {
                productsList = result.data.filter(a => a.county === county);
                setProduct(productsList);
            } else if (category !== '') {
                productsList = result.data.filter(a => a.category === category);
                setProduct(productsList);
            } else {
                setProduct(result.data)
            }

        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });

        }

    }


    const submitClicked = async (e: Event) => {

        e.preventDefault();
        history.push('/booking/create')
    }
    useEffect(() => {
        loadData();

    }, []);

    return (
        <>

            {products.map(product =>

                <div key={product.id} className="mainView">
                    <div className="boxLayout">


                        <tr>
                            <th id="alignCentre">
                                {product.pictureUrls?.map(picture =>

                                    <div >
                                        <img src={picture} key={picture} className='picture' alt='Pilt' />

                                    </div>


                                )}

                            </th>
                            {product.pictureUrls?.length !== 0 ?

                                <>
                                    <p style={{ verticalAlign: 'top', alignItems: 'right' }}>

                                        <Link to={'/products/create'}>{element}</Link>

                                    </p>
                                </>
                                :
                                <>
                                </>

                            }

                            <div className="boxLayout" id="box4">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>{appState.langResources.bllAppDTO.products.description}:</td>
                                            <td>{product.description}</td>
                                        </tr>
                                        <tr>
                                            <td>{appState.langResources.bllAppDTO.products.county}:</td>
                                            <td>{product.county}</td>
                                        </tr>
                                        <tr>
                                            <td>{appState.langResources.bllAppDTO.products.city}:</td>
                                            <td>{product.city}</td>
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
                                            <td>{product.category}</td>
                                        </tr>
                                        <tr>
                                            <td>{appState.langResources.bllAppDTO.products.color}:</td>
                                            <td>{product.color}</td>
                                        </tr>

                                        <tr>
                                            <td>{appState.langResources.bllAppDTO.products.width}:</td>
                                            <td>{product.width}{product.unit}</td>
                                        </tr>
                                        <tr>
                                            <td>{appState.langResources.bllAppDTO.products.height}:</td>
                                            <td>{product.height}{product.unit}</td>
                                        </tr>
                                        <tr>
                                            <td>{appState.langResources.bllAppDTO.products.depth}:</td>
                                            <td>{product.depth}{product.unit}</td>
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
                                            <td>{product.condition}</td>
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

                            {appState.token !== null && !product.isBooked ?
                                <>

                                    <div className="form-group" id="reserveButton">
                                        <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.bllAppDTO.bookings.reserve}</button>
                                    </div>

                                </>
                                :
                                <>

                                </>

                            }
                        </tr>

                    </div>
                </div>


            )}

            <Loader {...pageStatus} />
        </>

    );
}

export default SearchIndex;