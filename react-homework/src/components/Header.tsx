import React, { useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ILanguageResources } from '../dto/ILanguageResources';
import { ISupportedLanguage } from '../dto/ISupportedLanguage';
import { LangService } from "../services/lang-service";
import { useEffect } from "react";
import { ApiBaseUrl } from "../configuration";
import { type } from "jquery";


const Header = () => {

    const appState = useContext(AppContext);
    let role: string = '';

    function jobu(){
    
    }
    console.log(typeof jobu)

    const loadData = useCallback(async () => {

      console.log(Math.ceil(3.6))
      console.log(Math.round(-1.6))

      console.log(Math.floor(3.6))

     
        var a = document.querySelector('#homeButton');


        a!.innerHTML = '<div>Hei</div>';
       
        a!.innerHTML = '<span>Hey2</span>';
    

  

       
          let m = undefined;
        let data = window.localStorage.getItem('state');
        window.localStorage.clear();

        if (data != null) {
            let state = JSON.parse(data);
            console.log(state)
            appState.currentLanguage = state.currentLanguage;
            appState.supportedLanguages = state.supportedLanguages;
            appState.langResources = state.langResources;
            console.log(appState)
            appState.setAuthInfo(state.token, state.firstName, state.lastName);
        }

        let result = await LangService.getLanguageResources(ApiBaseUrl + '/lang/GetLangResources', appState.currentLanguage.name);

        if (result.ok && result.data) {
            appState.langResources = result.data as ILanguageResources;

        }
        console.log(appState)

    }, [appState])


    const changeLanguage = async (lang: ISupportedLanguage, e: Event) => {
        e.preventDefault();


        
        appState.currentLanguage = lang;
        let result = await LangService.getLanguageResources(ApiBaseUrl + '/lang/GetLangResources', appState.currentLanguage.name);

        if (result.ok && result.data) {

            appState.langResources = result.data as ILanguageResources;

        }
        window.localStorage.setItem('state', JSON.stringify(appState));
        window.location.reload();
    }
  


    useEffect(() => {

        loadData();

    }, [loadData]);
    if (appState.token != null) {
        const info = JSON.parse(atob(appState.token!.split('.')[1]));
        role = info["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    console.log(role)

    return (

       
        <header>
            <nav className="navbar navbar-expand-sm  navbar-toggleable-sm navbar-light  bg-light border-bottom box-shadow mb-3">
                <div className="container">
                    <NavLink className="fa fa-home text-gray" id="homeButton" to="/">Home</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">

                            {appState.token === null ?
                                <>
                                    <li className="nav-item">
                                        <NavLink  className="nav-link text-dark" to="/booking" >{appState.langResources.bllAppDTO.bookings.findAProduct}</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <NavLink  className="nav-link text-dark" to="/booking">{appState.langResources.bllAppDTO.bookings.findAProduct}</NavLink>
                                    </li>
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-gray" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {appState.langResources.bllAppDTO.userMessage.userMessages}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/messageForm">{appState.langResources.bllAppDTO.messageForms.sendMessage}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/userMessages">{appState.langResources.bllAppDTO.userMessage.newMessage}</NavLink>
                                            </li>
                                        </div>
                                    </div>
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-gray" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {appState.langResources.bllAppDTO.products.myProduct}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/products">{appState.langResources.bllAppDTO.products.myProduct}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/userBooked-Products">{appState.langResources.bllAppDTO.userBookedProduct.userBookedProducts}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/productMaterial">{appState.langResources.bllAppDTO.productMaterials.productMaterial}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/pictures">{appState.langResources.bllAppDTO.pictures.picture}</NavLink>
                                            </li>
                                        </div>
                                    </div>


                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-gray" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {appState.langResources.views.shared.buttons.search}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/category">{appState.langResources.bllAppDTO.categories.category}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/material">{appState.langResources.bllAppDTO.materials.material}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/city">{appState.langResources.bllAppDTO.cities.city}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/county">{appState.langResources.bllAppDTO.counties.county}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/condition">{appState.langResources.bllAppDTO.conditions.condition}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/unit">{appState.langResources.bllAppDTO.units.unit}</NavLink>
                                            </li>

                                        </div>
                                    </div>
                                </>

                            }

                            {role === "Admin" ?
                                <>
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-gray" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {appState.langResources.appUser.appUser}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/appUser">{appState.langResources.appUser.appUser}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" to="/appRole">{appState.langResources.appRole.appRole}</NavLink>
                                            </li>

                                        </div>
                                    </div>
                                </>
                                :
                                <>

                                </>
                            }

                        </ul>
                        <div className="navbar-nav">

                            {appState.token != null ?
                                <>
                                    <li className="nav-item" id="nameLayout">
                                        <NavLink id="userLayout" className='fas fa-user-alt' to="/account">{appState.firstName + ' ' + appState.lastName}</NavLink>
                                    </li>

                                    <li className="nav-item" >
                                        <a href="/#" onClick={() => appState.setAuthInfo(null, '', '')} className="nav-link text-gray" >{appState.langResources.views.shared.loginPartial.logout}</a>
                                    </li>

                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-gray" to="/identity/login">{appState.langResources.views.shared.loginPartial.login}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-gray" to="/identity/register">{appState.langResources.views.shared.loginPartial.register}</NavLink>
                                    </li>

                                </>

                            }
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle material-icons" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons">&#xe894;</i>
                                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                                </a>

                                <div className="dropdown-menu" aria-labelledby="navbarDropdown" >

                                    {appState.supportedLanguages.map(lang =>

                                        <a key={lang.name} className="nav-link text-dark" onClick={(e) => changeLanguage(lang, e.nativeEvent)} href="/#">{lang.nativeName}</a>

                                    )}

                                </div>
                            </li>

                        </div>
                    </div>
                </div>
            </nav>

        </header >

    );


}




export default Header;
