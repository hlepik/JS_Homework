import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ICounty } from "../../dto/ICounty";
import { useContext, useEffect, useState } from "react";
import { count } from "console";
import { AppContext, IAppState, initialAppState } from "../../context/AppContext";



const RowDisplay = (props: { county: ICounty, role: string }) => (

    <tr>
        <td>
            {props.county.name}
        </td>


        { props.role === 'Admin' ?
            <>
                <td>
                    <Link to={'/county/edit/' + props.county.id}>Edit</Link> |
                    <Link to={'/county/' + props.county.id}>Details</Link>
                </td>

            </>
            :
            <>
                <td>
                    <Link to={'/county/' + props.county.id}>Details</Link>
                </td>
            </>
        }
    </tr>
);



const CountyIndex = () => {

    const appState = useContext(AppContext);
    const [counties, setCounties] = useState([] as ICounty[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });



    const loadData = async () => {
        let result = await BaseService.getAll<ICounty>('/Counties', appState.token!);
        console.log(appState);


        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setCounties(result.data);
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
            <h1>Counties</h1>
            {appState.token != null && role === 'Admin' ?

                <p>
                    <Link to={'/county/create'}>Create</Link>
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
                    {counties.map(county =>
                        <RowDisplay county={county} key={county.id} role={role} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>

    );
}

export default CountyIndex;