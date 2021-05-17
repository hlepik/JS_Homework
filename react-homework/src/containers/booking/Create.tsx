import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Alert, { EAlertClass } from "../../components/Alert";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";


const BookingCreate =  (props: any) => {  
    let { id } = useParams() as IRouteId;

    const appState = useContext(AppContext);
    const [editData, setBooking] = useState({ until: new Date(), productId: '', appUserId: '', timeBooked: new Date() });
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();
    const productName = props.location.state.data;
    const productId = id;


    const submitClicked = async (e: Event) => {

        e.preventDefault();

        editData.productId = productId;
 
        const info = JSON.parse(atob(appState.token!.split('.')[1]));
        let appUserId = info["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      
        console.log(appUserId)
        setAlertMessage('');
        console.log(editData)
        editData.appUserId = appUserId;

        const url = '/Bookings';
        let response = await BaseService.post(url, editData, appState.token!);

        console.log(response)
        if (response.statusCode >= 200 && response.statusCode < 400) {
            history.push('/booking')
        } else {
            setAlertMessage(response.messages![0]);
        }

    }


    useEffect(() => {

    }, []);


    return (
        <>
            <h2>{appState.langResources.bllAppDTO.bookings.reserve}</h2 >
     

            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-sm-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label>{appState.langResources.bllAppDTO.bookings.until}</label>
                                <input onChange={e => setBooking({ ...editData, until: e.target.valueAsDate! })} className="form-control" type="date" id="Input_Until" name="Input.Until" />
                            </div>
                            <dt className="col-sm-10">{appState.langResources.bllAppDTO.products.description}</dt>

                            <dd className="col-sm-10">
                                {productName}
                            </dd>
                            <div className="form-group">
                                <button onClick={(e) => submitClicked(e.nativeEvent)} type="submit" className="btn btn-primary">{appState.langResources.bllAppDTO.bookings.reserve}</button>
                            </div>
                            <p>
                                <Link to={'/booking'}>{appState.langResources.crud.index}</Link>
                            </p>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default BookingCreate;