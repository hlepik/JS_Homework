import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { IPicture } from "../../dto/IPicture";
import { IProduct } from "../../dto/IProduct";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import React, { useCallback } from 'react';

const PictureEdit = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setPicture] = useState({} as IPicture);
    const [productData, setProduct] = useState([] as IProduct[]);
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();


    const loadData = useCallback(async () => {
        console.log(id)

        let result = await BaseService.get<IPicture>('/Pictures/' + id, appState.token!);
        let productResult = await BaseService.getAll<IProduct>('/Products', appState.token!);


        if (productResult.ok && productResult.data) {
            setProduct(productResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: productResult.statusCode });
        }

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPicture(result.data);


        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }, [appState, id])
    const submitClicked = async (e: Event) => {

        e.preventDefault();

        if (editData.url.length < 2) {
            setAlertMessage('The field Url must be a string or array type with a minimum length of 2.');
        }
        if (editData.productName?.length! < 1) {
            setAlertMessage('Product name is empty!');
        }
        setAlertMessage('');
        console.log(editData)

        const url = '/Pictures/' + id;
        let response = await BaseService.edit(url, editData, appState.token!);

        console.log(response)
        if (response.statusCode >= 200 && response.statusCode < 400) {
            history.push('/pictures')
        } else {
            setAlertMessage(response.messages![0]);
       
        }
    }


    useEffect(() => {
        loadData();
    }, [loadData]);


    return (
        <>
            <h2> {appState.langResources.crud.edit}</h2 >
            <h3>{appState.langResources.bllAppDTO.pictures.picture}</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.pictures.url}</label>
                                <input value={editData.url || ''} onChange={e => setPicture({ ...editData, url: e.target.value })} className="form-control" type="text" id="Input_Url" name="Input.Url" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="formSelect">{appState.langResources.bllAppDTO.pictures.productName}</label>
                                <select value={editData.productId || ''} onChange={e => setPicture({ ...editData, productId: e.target.value })} className="form-control" id="formSelect">
                                    {productData.map(product =>
                                        <option key={product.id} value={product.id || ''}>{product.description}</option>
                                    )};

                                </select>
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
                            </div>
                            <p>
                                <Link to={'/pictures'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}

export default PictureEdit;