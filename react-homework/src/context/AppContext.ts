import React from "react";

export interface IAppState {
    token: string | null;
    firstName: string;
    lastName: string;
    setAuthInfo: (token: string | null, firstName: string, lastName: string) => void;
}

export const initialAppState : IAppState = {
    token: null,
    firstName: '',
    lastName: '',


    setAuthInfo: (token: string | null, firstName: string, lastName: string): void => {}
}

export const AppContext = React.createContext<IAppState>(initialAppState);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
