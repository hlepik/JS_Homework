import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import { IUnit } from "../../dto/IUnit";
import { IProduct } from "../../dto/IProduct";
import { ICity } from "../../dto/ICity";
import { ICounty } from "../../dto/ICounty";
import { ICategory } from "../../dto/ICategory";
import { ICondition } from "../../dto/ICondition";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";


const ProductEdit = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setProduct] = useState({} as IProduct || '');
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();
    const [unitData, setUnit] = useState([] as IUnit[]);
    const [cityData, setCity] = useState([] as ICity[]);
    const [countyData, setCounty] = useState([] as ICounty[]);
    const [categoryData, setCategory] = useState([] as ICategory[]);
    const [conditionData, setCondition] = useState([] as ICondition[]);

    const loadData = useCallback(async () => {
        console.log(id)


        let result = await BaseService.get<IProduct>('/Products/' + id, appState.token!);

        console.log(result)
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProduct(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

        let unitResult = await BaseService.getAll<IUnit>('/Units?culture=' + appState.currentLanguage.name, appState.token!);
        if (unitResult.ok && unitResult.data) {
            setUnit(unitResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: unitResult.statusCode });
        }

        let cityResult = await BaseService.getAll<ICity>('/Cities?culture=' + appState.currentLanguage.name, appState.token!);
        if (cityResult.ok && cityResult.data) {
            setCity(cityResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: cityResult.statusCode });
        }

        let countyResult = await BaseService.getAll<ICounty>('/Counties?culture=' + appState.currentLanguage.name, appState.token!);
        if (countyResult.ok && countyResult.data) {
            setCounty(countyResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: countyResult.statusCode });
        }

        let categoryResult = await BaseService.getAll<ICategory>('/Categories?culture=' + appState.currentLanguage.name, appState.token!);
        if (categoryResult.ok && categoryResult.data) {
            setCategory(categoryResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: categoryResult.statusCode });
        }

        let conditionResult = await BaseService.getAll<ICondition>('/Conditions?culture=' + appState.currentLanguage.name, appState.token!);
        if (conditionResult.ok && conditionResult.data) {
            setCondition(conditionResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: conditionResult.statusCode });
        }

    }, [appState, id])



    const submitClicked = async (e: Event) => {

        e.preventDefault();

        console.log(editData)
        if (editData.description === undefined || editData.description.length < 2) {
            setAlertMessage(appState.langResources.bllAppDTO.products.description +" "+ appState.langResources.common.required);        
        } else if (editData.countyId ===  undefined ){
            setAlertMessage(appState.langResources.bllAppDTO.products.county +" "+ appState.langResources.common.required); 
        } else if (editData.categoryId ===  undefined ){
            setAlertMessage(appState.langResources.bllAppDTO.products.category +" "+ appState.langResources.common.required); 
        } else if (editData.conditionId ===  undefined ){
            setAlertMessage(appState.langResources.bllAppDTO.products.condition +" "+ appState.langResources.common.required); 
        } else {
            setAlertMessage('');

            const url = '/Products/' + id;
            let response = await BaseService.edit(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/products')
            } else {
                setAlertMessage("Error");
            }
        }
    }


    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <>
            <h2>{appState.langResources.crud.edit}</h2 >
            <h3>{appState.langResources.bllAppDTO.products.product}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.products.description}</label>
                                <input value={editData.description || ''} onChange={e => setProduct({ ...editData, description: e.target.value })} className="form-control" type="text" id="Input_ProductName" name="Input.ProductName" placeholder={editData.description} autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.products.color}</label>
                                <input value={editData.color || ''} onChange={e => setProduct({ ...editData, color: e.target.value })} className="form-control" type="text" id="Input_ProductColor" name="Input.ProductColor" placeholder={editData.color} autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.products.productAge}</label>
                                <input value={editData.productAge} onChange={e => setProduct({ ...editData, productAge: e.target.valueAsNumber })} className="form-control" min='0' type="number" id="Input_ProductAge" name="Input.ProductAge" autoComplete="current-name" />
                            </div>
                            <div className="form-group form-check">
                                <input checked={editData.isBooked} onChange={e => setProduct({ ...editData, isBooked: e.target.checked })} type="checkbox" className="form-check-input" id="formInputIsBooked" />
                                <label className="form-check-label" htmlFor="formInputCheckBox">{appState.langResources.bllAppDTO.products.isBooked}</label>
                            </div>
                            <div className="form-group form-check">
                                <input checked={editData.hasTransport} onChange={e => setProduct({ ...editData, hasTransport: e.target.checked })} type="checkbox" className="form-check-input" id="formInputCheckBox" />
                                <label className="form-check-label" htmlFor="formInputCheckBox">{appState.langResources.bllAppDTO.products.hasTransport}</label>
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.products.height}</label>
                                <input value={editData.height} onChange={e => setProduct({ ...editData, height: e.target.valueAsNumber })} className="form-control" min={0} type="number" id="Input_ProductHeight" name="Input.ProductHeight" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.products.width}</label>
                                <input value={editData.width} onChange={e => setProduct({ ...editData, width: e.target.valueAsNumber })} className="form-control" min={0} type="number" id="Input_ProductWidth" name="Input.ProductWidth" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.products.depth}</label>
                                <input value={editData.depth} onChange={e => setProduct({ ...editData, depth: e.target.valueAsNumber })} className="form-control" min={0} type="number" id="Input_ProductDepth" name="Input.ProductDepth" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.products.unit}</label>
                                <select value={editData.unitId || ''} onChange={e => setProduct({ ...editData, unitId: e.target.value })} className="form-control" id="formSelect">
                                    <option>---{appState.langResources.dropDown.select}---</option>
                                    {unitData.map(unit =>
                                        <option key={unit.id} value={unit.id || ''}>{unit.name}</option>
                                    )};

                                </select>
                            </div>


                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.products.county}</label>
                                <select value={editData.countyId || ''} onChange={e => setProduct({ ...editData, countyId: e.target.value })} className="form-control" id="county">
                                    <option>---{appState.langResources.dropDown.select}---</option>
                                    {countyData.map(county =>
                                        <option key={county.id} value={county.id || ''}>{county.name}</option>
                                    )};

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.products.city}</label>
                                <select value={editData.cityId || ''} onChange={e => setProduct({ ...editData, cityId: e.target.value })} className="form-control" id="city">
                                    <option>---{appState.langResources.dropDown.select}---</option>
                                    {cityData.map(city =>
                                        <option key={city.id} value={city.id || ''}>{city.name}</option>
                                    )};

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.products.category}</label>
                                <select value={editData.categoryId || ''} onChange={e => setProduct({ ...editData, categoryId: e.target.value })} className="form-control" id="category">
                                    <option>---{appState.langResources.dropDown.select}---</option>
                                    {categoryData.map(category =>
                                        <option key={category.id} value={category.id || ''}>{category.name}</option>
                                    )};

                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.products.condition}</label>
                                <select value={editData.conditionId || ''} onChange={e => setProduct({ ...editData, conditionId: e.target.value })} className="form-control" id="fcondition">
                                    <option>---{appState.langResources.dropDown.select}---</option>
                                    {conditionData.map(condition =>
                                        <option key={condition.id} value={condition.id || ''}>{condition.description}</option>
                                    )};

                                </select>
                            </div>
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.products.locationDescription}</label>
                                <input value={editData.locationDescription || ''} onChange={e => setProduct({ ...editData, locationDescription: e.target.value })} className="form-control" type="text" id="Input_ProductLocationDescription" name="Input.ProductLocationDescription" placeholder={editData.locationDescription} autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                            </div>
                            <p>
                                <Link to={'/products'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}

export default ProductEdit;