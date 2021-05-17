import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import { IAppUser } from "../../dto/IAppUser";
import { IAppRole } from "../../dto/IAppRole";
import React, { useCallback } from 'react';
import Loader from "../../components/Loader";
import Alert, { EAlertClass } from "../../components/Alert";

const AppRoleChange = () => {

    let { id } = useParams() as IRouteId;
    const appState = useContext(AppContext);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [role, setAppRole] = useState({} as IAppRole);
    const [alertMessage, setAlertMessage] = useState('');
    const [memberData, setAppUserMember] = useState([] as IAppUser[]);
    const [nonMemberData, setAppUserNonMember] = useState([] as IAppUser[]);
    const [userData, setUser] = useState({ id: '' , name: ''});
    const [nonRoleData, setOutOfRole] = useState({ id: '' , name: ''});
    let history = useHistory();

    const loadData = useCallback(async () => {


        let appResult = await BaseService.get<IAppRole>('/AppRole/' + id, appState.token!);

        if (appResult.ok && appResult.data) {
            setAppRole(appResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: appResult.statusCode });
        }

        let result = await BaseService.getAll<IAppUser>('/AppRole/Members/' + id, appState.token!);

        console.log(result)
        if (result.ok && result.data) {

            setAppUserMember(result.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
        let nonResult = await BaseService.getAll<IAppUser>('/AppRole/NonMembers/' + id, appState.token!);


        if (nonResult.ok && nonResult.data) {

            setAppUserNonMember(nonResult.data);
        }
        else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: nonResult.statusCode });
        }


    }, [appState, id])

    const submitClicked = async (e: Event) => {

        e.preventDefault();

        setAlertMessage('');

        console.log(nonRoleData)
        console.log(userData)
      
      
        if (userData.id !== '') {
            const url = '/AppRole/AddUsersToRole';
            let response = await BaseService.edit(url, userData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
            
            } else {
                setAlertMessage('Error')
            }

        }
        if (nonRoleData.id !== '') {
            const url = '/AppRole/Remove/UsersFromRole';
            let response = await BaseService.edit(url, nonRoleData, appState.token!);

            console.log(response)
            if (response.statusCode >= 200 && response.statusCode < 400) {
          
            } else {
                setAlertMessage('Error')
            }

        }
        history.push('/appRole')

    }

    useEffect(() => {
        loadData();

    }, [loadData]);

    return (
        <>
            <form onSubmit={(e) => submitClicked(e.nativeEvent)}>

                <h2 className="bg-info p-1 text-white">{appState.langResources.appRole.addTo} {role.name}</h2>
                <table className="table table-bordered table-sm">
                <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />

                    <>
                        {nonMemberData.map(user =>
                            <tr>
                                <td>{user.email}</td>

                                <td>
                                    <input type="checkbox" name="NonMembersIds" value={user.id} onChange={e => setUser({ ...userData, id: e.target.value, name: role.name })} />
                                </td>
                            </tr>
                        )}

                    </>
                </table>

                <h2 className="bg-info p-1 text-white">{appState.langResources.appRole.removeFrom} {role.name}</h2>
                <table className="table table-bordered table-sm">
                    <>
                        {memberData.map(user =>
                            <tr>
                                <td>{user.email}</td>
                                <td>
                                    <input type="checkbox" name="MembersIds" value={user.id} onChange={e => setOutOfRole({ ...nonRoleData, id: e.target.value, name: role.name })} />
                                </td>
                            </tr>
                        )}
                    </>
                </table>
                <button type="submit" className="btn btn-primary">{appState.langResources.views.shared.buttons.save}</button>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}

export default AppRoleChange;