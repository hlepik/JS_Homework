import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IProduct } from "../../dto/IProduct";
import { ICity } from "../../dto/ICity";
import { ICounty } from "../../dto/ICounty";
import { ICategory } from "../../dto/ICategory";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";



const HomeIndex = () => {

    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [cityData, setCity] = useState([] as ICity[]);
    const [countyData, setCounty] = useState([] as ICounty[]);
    const [categoryData, setCategory] = useState([] as ICategory[]);
    const [productData, setProduct] = useState([] as IProduct[]);
    const [searchData, setSearch] = useState({ city: '', county: '', category: '' });

    const loadData = useCallback(async () => {

        let result = await BaseService.getFour<IProduct>('/Products/four/lastFour?culture=' + appState.currentLanguage.name);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProduct(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }


        let cityResult = await BaseService.getAll<ICity>('/Cities?culture=' + appState.currentLanguage.name);

        if (cityResult.ok && cityResult.data) {
            setCity(cityResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: cityResult.statusCode });
        }

        let countyResult = await BaseService.getAll<ICounty>('/Counties?culture=' + appState.currentLanguage.name);
        if (countyResult.ok && countyResult.data) {
            setCounty(countyResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: countyResult.statusCode });
        }

        let categoryResult = await BaseService.getAll<ICategory>('/Categories?culture=' + appState.currentLanguage.name);
        if (categoryResult.ok && categoryResult.data) {
            setCategory(categoryResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: categoryResult.statusCode });
        }
    }, [appState.currentLanguage.name]);

    useEffect(() => {

        loadData();
    }, [loadData]);

    return (
        <>

            <div className="mainBox" >
                <h2>{appState.langResources.views.shared.buttons.search}</h2>

                <div className="boxLayout">
                    <React.Fragment>
                        <form asp-action="Search">
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <td className="searchList">

                                                <label htmlFor='formSelect' className="control-label">{appState.langResources.bllAppDTO.counties.county}</label>
                                                <select value={searchData.county || ''} onChange={e => setSearch({ ...searchData, county: e.target.value })} className="form-control" id='countySelectList' >
                                                    <option>---{appState.langResources.dropDown.select}---</option>
                                                    {countyData.map(county =>
                                                        <option key={county.id} value={county.name}>{county.name}</option>
                                                    )};
                                         </select>
                                            </td>
                                            <td className="searchList">

                                                <label htmlFor='formSelect' className="control-label">{appState.langResources.bllAppDTO.cities.city}</label>
                                                <select value={searchData.city || ''} onChange={e => setSearch({ ...searchData, city: e.target.value })} className="form-control" id='citySelectList'>
                                                    <option>---{appState.langResources.dropDown.select}---</option>
                                                    {cityData.map(city =>
                                                        <option key={city.id} value={city.name}>{city.name}</option>
                                                    )};
                                         </select>
                                            </td>
                                            <td className="searchList">

                                                <label htmlFor='formSelect' className="control-label">{appState.langResources.bllAppDTO.categories.category}</label>
                                                <select value={searchData.category || ''} onChange={e => setSearch({ ...searchData, category: e.target.value })} className="form-control" id='categorySelectList'>
                                                    <option>---{appState.langResources.dropDown.select}---</option>
                                                    {categoryData.map(category =>
                                                        <option key={category.id} value={category.name}>{category.name}</option>
                                                    )};
                                         </select>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>

                                <button className="btn btn-primary" style={{ float: 'right' }} id='but' >
                                    <Link
                                        to={{
                                            pathname: '/search',
                                            state: {
                                                data: searchData,
                                            },
                                        }}
                                    >{appState.langResources.views.shared.buttons.search}</Link>
                                </button>
                            </>
                        </form>
                    </React.Fragment>
                </div>
            </div>
            <h2>{appState.langResources.bllAppDTO.products.recentlyAddedProducts}</h2>
            <>
    
                {productData.map(product =>

                        <div key={product.id} className="boxLayout" id="box1">
                            
                            <table>
                        
                                <tbody>
                                    <tr>
                                        <th id='pictureElement'>

                                            {product.pictureUrls ?

                                                <>
                                                    {product.pictureUrls?.slice(product.pictureUrls.length - 1).map((picture) =>
                                                        <img src={picture} key={picture} id='picture' alt='Pilt' />

                                                    )}

                                                </>

                                                :
                                                <>
                                                </>
                                            }


                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.description}:</td>
                                        <td >{product.description}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.county}:</td>
                                        <td>{product.countyName}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.category}:</td>
                                        <td>{product.categoryName}</td>
                                    </tr>
                                    <tr>
                                        <td>{appState.langResources.bllAppDTO.products.isBooked}:</td>

                                        <td>
                                            <input type="checkbox" defaultChecked={product.isBooked} disabled={true} />
                                        </td>
                                    </tr>

                                </tbody>
                                   
                            </table>
                      

                        </div>

                )}

            </>


            <Loader {...pageStatus} />

        </>
    )
}

export default HomeIndex;