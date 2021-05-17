import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import { IProductMaterial } from "../../dto/IProductMaterial";
import { IProduct } from "../../dto/IProduct";
import { IMaterial } from "../../dto/IMaterial";
import React, { useCallback } from 'react';


const ProductMaterialCreate = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [editData, setProductMaterial] = useState({productId: '', materialId: ''});
    const [alertMessage, setAlertMessage] = useState('');
    const [productData, setProduct] = useState([] as IProduct[]);
    const [materialData, setMaterial] = useState([] as IMaterial[]);

    let history = useHistory();
   
   

    const loadData = useCallback(async () => {
        console.log(id)

        let productResult = await BaseService.getAll<IProduct>('/Products', appState.token!);
        let materialResult = await BaseService.getAll<IMaterial>('/Materials', appState.token!);

        if (productResult.ok && productResult.data) {
            setProduct(productResult.data);
        }
        if (materialResult.ok && materialResult.data) {
            setMaterial(materialResult.data);
        }
    }, [appState, id])

    const submitClicked = async (e: Event) => {

        e.preventDefault();
        if(typeof(editData.materialId) === 'undefined'){
            setAlertMessage('material can not be empty!')
        }

        else if (typeof(editData.productId) === 'undefined') {
            setAlertMessage('Product name can not be empty!');
        } else {
            setAlertMessage('');
            console.log(editData)

            const url = '/ProductMaterials';
            let response = await BaseService.post(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/productMaterial')
            } else {
                setAlertMessage('Error')
            }
        }
    }


    useEffect(() => {
        loadData();

    }, [loadData]);

    return (
        <>
            <h2>{appState.langResources.crud.create}</h2 >
            <h3>{appState.langResources.bllAppDTO.productMaterials.productMaterial}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.materials.material}</label>
                                <select value={editData.materialId} onChange={e => setProductMaterial({ ...editData, materialId: e.target.value })} className="form-control" id="formSelect">
                                    <option>---{appState.langResources.dropDown.select}---</option>
                                    {materialData.map(material =>
                                        <option key={material.id} value={material.id}>{material.name}</option>
                                    )};

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.products.product}</label>
                                <select value={editData.productId} onChange={e => setProductMaterial({ ...editData, productId: e.target.value })} className="form-control" id="formSelect">
                                    <option>---{appState.langResources.dropDown.select}---</option>
                                    {productData.map(product =>
                                        <option key={product.id} value={product.id}>{product.description}</option>
                                    )};

                                </select>
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                            </div>
                            <p>
                                <Link to={'/productMaterial'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ProductMaterialCreate;