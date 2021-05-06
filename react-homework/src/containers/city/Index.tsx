import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ICity } from "../../dto/ICity";
import { useContext, useEffect, useState } from "react";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";


const RowDisplay = (props: { city: ICity, role: string }, appState: any) => (
    <tr>
        <td>
            {props.city.name}
        </td>

        <td>
            <Link to={'/city/edit/' + props.city.id}>Edit</Link> |

            <Link to={'/city/' + props.city.id}>Details</Link>
        </td>
    </tr>
);


const CityIndex = () => {

    const appState = useContext(AppContext);
    const [cities, setCities] = useState([] as ICity[] || '');
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = async () => {
        let result = await BaseService.getAll<ICity>('/Cities', appState.token!);
        console.log(result);
        console.log(appState)

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCities(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }

    }
    useEffect(() => {
        loadData();
    }, []);
    let role: string = '';
    if (appState.token != null) {
        const info = JSON.parse(atob(appState.token!.split('.')[1]));
        role = info["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }

    return (
        <>
            <h1>Cities</h1>

            {role === 'Admin' ?

                <p>
                    <Link to={'/city/create'}>Create</Link>
                </p>

                :
                <>
                </>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Name
                    </th>

                    </tr>
                </thead>
                <tbody>
                    {cities.map(city =>
                        <RowDisplay city={city} key={city.id} role={role} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default CityIndex;