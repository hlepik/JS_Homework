import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import { IPicture } from "../../dto/IPicture";
import { IProduct } from "../../dto/IProduct";


const PictureCreate = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [editData, setPicture] = useState({} as IPicture);
    const [alertMessage, setAlertMessage] = useState('');
    const [productData, setProduct] = useState([] as IProduct[]);

    let history = useHistory();
   
   

    const loadData = async () => {
        console.log(id)

        let productResult = await BaseService.getAll<IProduct>('/Products', appState.token!);
        if (productResult.ok && productResult.data) {
            setProduct(productResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: productResult.statusCode });
        }

    }

    const submitClicked = async (e: Event) => {

        e.preventDefault();
        if(typeof(editData.url) === 'undefined'){
            setAlertMessage('url can not be empty!')
        }

        else if (editData.url.length < 2) {
            setAlertMessage('The field Url must be a string or array type with a minimum length of 2.');
        }
        else if (typeof(editData.productName) === 'undefined') {
            setAlertMessage('Product name can not be empty!');
        } else {
            setAlertMessage('');
            console.log(editData)

            const url = '/Pictures';
            let response = await BaseService.post(url, editData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
                history.push('/pictures')
            } else {
                setAlertMessage('Error')
            }
        }
    }


    useEffect(() => {
        loadData();

    }, []);

    return (
        <>
            <h2>Create</h2 >
            <h3>Picture</h3>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>Url</label>
                                <input value={editData.url} onChange={e => setPicture({ ...editData, url: e.target.value })} className="form-control" type="text" id="Input_CityName" name="Input.CityName" autoComplete="current-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="formSelect">Product name</label>
                                <select value={editData.productName} onChange={e => setPicture({ ...editData, productId: e.target.value })} className="form-control" id="formSelect">
                                    <option>---Please select---</option>
                                    {productData.map(product =>
                                        <option key={product.id} value={product.id}>{product.description}</option>
                                    )};

                                </select>
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Save</button>
                            </div>
                            <p>
                                <Link to={'/pictures'}>Back to List</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default PictureCreate;