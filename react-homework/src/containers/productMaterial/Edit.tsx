import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IProductMaterial } from "../../dto/IProductMaterial";
import { IProduct } from "../../dto/IProduct";
import { IMaterial } from "../../dto/IMaterial";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import React, { useCallback } from 'react';


const ProductMaterialEdit = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setProductMaterial] = useState({} as IProductMaterial);
    const [productData, setProduct] = useState([] as IProduct[]);
    const [materialData, setMaterial] = useState([] as IMaterial[]);
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();


    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IProductMaterial>('/ProductMaterials/' + id, appState.token!);
        let productResult = await BaseService.getAll<IProduct>('/Products', appState.token!);
        let materialResult = await BaseService.getAll<IMaterial>('/Materials', appState.token!);


        if (productResult.ok && productResult.data) {
            setProduct(productResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: productResult.statusCode });
        }
        if (materialResult.ok && materialResult.data) {
            setMaterial(materialResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: productResult.statusCode });
        }

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductMaterial(result.data);


        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])
    const submitClicked = async (e: Event) => {

        e.preventDefault();

        setAlertMessage('');
        console.log(editData)

        if (editData.productId === undefined || editData.productId === "") {

            setAlertMessage(appState.langResources.bllAppDTO.products.product + " " + appState.langResources.common.required);
        } else if (editData.materialId === undefined || editData.materialId === "") {
            setAlertMessage(appState.langResources.bllAppDTO.productMaterials.productMaterial + " " + appState.langResources.common.required);
        } else {
            const url = '/ProductMaterials/' + id;
            let response = await BaseService.edit(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/productMaterial')
            } else {
                setAlertMessage(response.messages![0]);

            }

        }

    }


    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <>
            <h2> {appState.langResources.crud.edit}</h2 >
            <h3>{appState.langResources.bllAppDTO.productMaterials.productMaterial}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />

                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.materials.material}</label>
                                <select value={editData.materialId || ''} onChange={e => setProductMaterial({ ...editData, materialId: e.target.value })} className="form-control" id="formSelect">
                                    {materialData.map(material =>
                                        <option key={material.id} value={material.id || ''}>{material.name}</option>
                                    )};

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.products.product}</label>
                                <select value={editData.productId || ''} onChange={e => setProductMaterial({ ...editData, productId: e.target.value })} className="form-control" id="formSelect">
                                    {productData.map(product =>
                                        <option key={product.id} value={product.id || ''}>{product.description}</option>
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
            <Loader {...pageStatus} />
        </>
    );
}

export default ProductMaterialEdit;