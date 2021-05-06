import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import PictureCreate from './containers/pictures/Create';
import PictureDelete from './containers/pictures/Delete';
import PictureDetails from './containers/pictures/Details';
import PictureEdit from './containers/pictures/Edit';
import PictureIndex from './containers/pictures/Index';
import CountyCreate from './containers/county/Create';
import CountyDetails from './containers/county/Details';
import CountyEdit from './containers/county/Edit';
import CountyIndex from './containers/county/Index';
import CityCreate from './containers/city/Create';
import CityDetails from './containers/city/Details';
import CityEdit from './containers/city/Edit';
import CityIndex from './containers/city/Index';
import HomeIndex from './containers/home/HomeIndex';
import Login from './containers/identity/Login';
import Register from './containers/identity/Register';
import Page404 from './containers/Page404';
import PageForm from './containers/PageForm';
import { AppContextProvider, initialAppState } from './context/AppContext';

function App() {
    const setAuthInfo = (token: string | null, firstName: string, lastName: string): void => {
        setAppState({...appState, token, firstName, lastName});
    }

    const [appState, setAppState] = useState({...initialAppState, setAuthInfo });

    return (
        <>
            <AppContextProvider value={appState} >
                <Header />
                <div className="container">
                    <main role="main" className="pb-3">
                        <Switch>
                            <Route exact path="/" component={HomeIndex} />

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

                            <Route path="/county/create" component={CountyCreate} />
                            <Route path="/county/edit/:id" component={CountyEdit} />
                            <Route path="/county/:id" component={CountyDetails} />
                            <Route path="/county" component={CountyIndex} />

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


