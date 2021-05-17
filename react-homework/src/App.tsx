import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import PictureCreate from './containers/pictures/Create';
import PictureDelete from './containers/pictures/Delete';
import PictureDetails from './containers/pictures/Details';
import PictureEdit from './containers/pictures/Edit';
import PictureIndex from './containers/pictures/Index';

import BookingCreate from './containers/booking/Create';
import BookingDetails from './containers/booking/Details';
import BookingIndex from './containers/booking/Index';

import CategoryCreate from './containers/category/Create';
import CategoryDetails from './containers/category/Details';
import CategoryEdit from './containers/category/Edit';
import CategoryIndex from './containers/category/Index';

import ConditionCreate from './containers/condition/Create';
import ConditionDetails from './containers/condition/Details';
import ConditionEdit from './containers/condition/Edit';
import ConditionIndex from './containers/condition/Index';

import CountyCreate from './containers/county/Create';
import CountyDetails from './containers/county/Details';
import CountyEdit from './containers/county/Edit';
import CountyIndex from './containers/county/Index';

import CityCreate from './containers/city/Create';
import CityDetails from './containers/city/Details';
import CityEdit from './containers/city/Edit';
import CityIndex from './containers/city/Index';

import MaterialCreate from './containers/material/Create';
import MaterialDetails from './containers/material/Details';
import MaterialEdit from './containers/material/Edit';
import MaterialIndex from './containers/material/Index';

import MessageFormCreate from './containers/messageForm/Create';
import MessageFormDetails from './containers/messageForm/Details';
import MessageFormDelete from './containers/messageForm/Delete';
import MessageFormIndex from './containers/messageForm/Index';

import ProductMaterialCreate from './containers/productMaterial/Create';
import ProductMaterialDetails from './containers/productMaterial/Details';
import ProductMaterialDelete from './containers/productMaterial/Delete';
import ProductMaterialIndex from './containers/productMaterial/Index';
import ProductMaterialEdit from './containers/productMaterial/Edit';


import ProductCreate from './containers/products/Create';
import ProductDetails from './containers/products/Details';
import ProductDelete from './containers/products/Delete';
import ProductIndex from './containers/products/Index';
import ProductEdit from './containers/products/Edit';

import UnitCreate from './containers/unit/Create';
import UnitDetails from './containers/unit/Details';
import UnitEdit from './containers/unit/Edit';
import UnitIndex from './containers/unit/Index';

import UserBookedProductsDelete from './containers/userBooked-Products/Delete';
import UserBookedProductsDetails from './containers/userBooked-Products/Details';
import UserBookedProductsIndex from './containers/userBooked-Products/Index';

import UserMessagesDelete from './containers/userMessages/Delete';
import UserMessagesDetails from './containers/userMessages/Details';
import UserMessagesIndex from './containers/userMessages/Index';

import AppUserDetails from './containers/appUser/Details';
import AppUserDelete from './containers/appUser/Delete';
import AppUserIndex from './containers/appUser/Index';
import AppUserEdit from './containers/appUser/Edit';

import AppRoleCreate from './containers/appRole/Create';
import AppRoleDetails from './containers/appRole/Details';
import AppRoleDelete from './containers/appRole/Delete';
import AppRoleIndex from './containers/appRole/Index';
import AppRoleEdit from './containers/appRole/Edit';
import AppRoleChange from './containers/appRole/Change';

import HomeIndex from './containers/home/HomeIndex';
import SearchIndex from './containers/search/Index';

import Login from './containers/identity/Login';
import Register from './containers/identity/Register';
import Page404 from './containers/Page404';
import PageForm from './containers/PageForm';
import { AppContextProvider, initialAppState } from './context/AppContext';

function App() {


    const setAuthInfo = (token: string | null, firstName: string, lastName: string): void => {
        setAppState({ ...appState, token, firstName, lastName });
    }
    const [appState, setAppState] = useState({ ...initialAppState, setAuthInfo });


    return (
        <>
            <AppContextProvider value={appState} >
                <Header />
                <div className="container">
                    <main role="main" className="pb-3">
                        <Switch>
                            <Route exact path="/" component={HomeIndex} />

                            <Route path="/search" component={SearchIndex} />

                            <Route path="/form" component={PageForm} />

                            <Route path="/identity/login" component={Login} />
                            <Route path="/identity/register" component={Register} />


                            <Route path="/pictures/create" component={PictureCreate} />
                            <Route path="/pictures/edit/:id" component={PictureEdit} />
                            <Route path="/pictures/delete/:id" component={PictureDelete} />
                            <Route path="/pictures/:id" component={PictureDetails} />
                            <Route path="/pictures" component={PictureIndex} />

                            <Route path="/city/create" component={CityCreate} />
                            <Route path="/city/edit/:id" component={CityEdit} />
                            <Route path="/city/:id" component={CityDetails} />
                            <Route path="/city" component={CityIndex} />

                            <Route path="/booking/create" component={BookingCreate} />
                            <Route path="/booking/:id" component={BookingDetails} />
                            <Route path="/booking" component={BookingIndex} />

                            <Route path="/category/create" component={CategoryCreate} />
                            <Route path="/category/edit/:id" component={CategoryEdit} />
                            <Route path="/category/:id" component={CategoryDetails} />
                            <Route path="/category" component={CategoryIndex} />

                            <Route path="/condition/create" component={ConditionCreate} />
                            <Route path="/condition/edit/:id" component={ConditionEdit} />
                            <Route path="/condition/:id" component={ConditionDetails} />
                            <Route path="/condition" component={ConditionIndex} />

                            <Route path="/county/create" component={CountyCreate} />
                            <Route path="/county/edit/:id" component={CountyEdit} />
                            <Route path="/county/:id" component={CountyDetails} />
                            <Route path="/county" component={CountyIndex} />

                            <Route path="/material/create" component={MaterialCreate} />
                            <Route path="/material/edit/:id" component={MaterialEdit} />
                            <Route path="/material/:id" component={MaterialDetails} />
                            <Route path="/material" component={MaterialIndex} />

                            <Route path="/messageForm/create" component={MessageFormCreate} />
                            <Route path="/messageForm/delete/:id" component={MessageFormDelete} />
                            <Route path="/messageForm/:id" component={MessageFormDetails} />
                            <Route path="/messageForm" component={MessageFormIndex} />

                            <Route path="/productMaterial/create" component={ProductMaterialCreate} />
                            <Route path="/productMaterial/edit/:id" component={ProductMaterialEdit} />
                            <Route path="/productMaterial/delete/:id" component={ProductMaterialDelete} />
                            <Route path="/productMaterial/:id" component={ProductMaterialDetails} />
                            <Route path="/productMaterial" component={ProductMaterialIndex} />

                            <Route path="/products/create" component={ProductCreate} />
                            <Route path="/products/edit/:id" component={ProductEdit} />
                            <Route path="/products/delete/:id" component={ProductDelete} />
                            <Route path="/products/:id" component={ProductDetails} />
                            <Route path="/products" component={ProductIndex} />

                            <Route path="/unit/create" component={UnitCreate} />
                            <Route path="/unit/edit/:id" component={UnitEdit} />
                            <Route path="/unit/:id" component={UnitDetails} />
                            <Route path="/unit" component={UnitIndex} />

                            <Route path="/userBooked-Products/delete/:id" component={UserBookedProductsDelete} />
                            <Route path="/userBooked-Products/:id" component={UserBookedProductsDetails} />
                            <Route path="/userBooked-Products" component={UserBookedProductsIndex} />

                            <Route path="/userMessages/delete/:id" component={UserMessagesDelete} />
                            <Route path="/userMessages/:id" component={UserMessagesDetails} />
                            <Route path="/userMessages" component={UserMessagesIndex} />

                            <Route path="/appUser/edit/:id" component={AppUserEdit} />
                            <Route path="/appUser/delete/:id" component={AppUserDelete} />
                            <Route path="/appUser/:id" component={AppUserDetails} />
                            <Route path="/appUser" component={AppUserIndex} />

                            <Route path="/appRole/create" component={AppRoleCreate} />
                            <Route path="/appRole/edit/:id" component={AppRoleEdit} />
                            <Route path="/appRole/delete/:id" component={AppRoleDelete} />
                            <Route path="/appRole/change/:id" component={AppRoleChange} />
                            <Route path="/appRole/:id" component={AppRoleDetails} />
                            <Route path="/appRole" component={AppRoleIndex} />

                            <Route component={Page404} />
                        </Switch>
                    </main>
                </div>
                <Footer />
            </AppContextProvider>
        </>
    );
}

export default App;


