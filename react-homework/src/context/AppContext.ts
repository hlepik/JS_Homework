import React from "react";
import { ISupportedLanguage } from "../dto/ISupportedLanguage";
import { ILanguageResources } from "../dto/ILanguageResources";

export interface IAppState {
    token: string | null;
    firstName: string;
    lastName: string;
    supportedLanguages: ISupportedLanguage[];
    currentLanguage: ISupportedLanguage;
    langResources: ILanguageResources;
    setAuthInfo: (token: string | null, firstName: string, lastName: string) => void;
}

export const initialAppState: IAppState = {
    token: null,
    firstName: '',
    lastName: '',
    currentLanguage: { name: 'en', nativeName: 'English' },
    supportedLanguages: [
        {
            "name": "en",
            "nativeName": "English"
        },
        {
            "name": "et",
            "nativeName": "eesti"
        }
    ],
    langResources: {
        "views": {
            "shared": {
                "layout": {
                    "languages": "Select language"

                },
                "buttons": {
                    "create": "Create",
                    "delete": "Delete",
                    "remove": "Remove",
                    "save": "Save",
                    "search": "Search",
                    "send": "Send"
                },
                "loginPartial": {
                    "hello": "Hello",
                    "login": "Login",
                    "logout": "Logout",
                    "register": "Register"
                }
            },
           
        },
        "bllAppDTO": {
            "bookings": {
                "booking": 'Booking',
                'findAProduct': 'Find a product',
                "reserve": 'Reserve',
                "timeBooked": 'Time Booked',
                "until": 'Until'
            },
            "categories": {
                "category": "Category",
                "name": "Name"
            },
            "cities": {
                "city": "City",
                "name": "Name"
            },
            "conditions": {
                "condition": "Condition",
                "description": "Description"
            },
            "counties": {
                "county": "County",
                "name": "Name"
            },
            "materials": {
                "material": "Material",
                "name": "Name",
                "comment": "Comment"
            },
            "messageForms": {
                "email": "Email",
                "message": "Message",
                "subject": "Subject",
                "dateSent": "Date Sent",
                "messageForm": "New Message",
                "sendMessage": "Send Message"
            },
            "pictures": {
                "picture": "Pictures",
                "url": "Picture",
                "productName": "Product description"
            },
            "productMaterials": {
                "productMaterial": "Product material"
            },
            "products": {
                "product": "Product",
                "category": "Category",
                "city": "City",
                "county": "County",
                "color": "Color",
                "description": "Description",
                "depth": "Depth",
                "dateAdded": "Date Added",
                "height": "Height",
                "width": "Width",
                "locationDescription": "Location description",
                "location": "Location",
                "hasTransport": "Transort",
                "isBooked": "Booked",
                "myProduct": "My Product",
                "material": "Material",
                "unit": "Unit",
                "recentlyAddedProducts": "Recently Added Products",
                "condition": "Condition",
                "picture": "Picture",
                "productAge": "Product Age",
                "size": "Size"
            },
            "units": {
                "name": "Name",
                "unit": "Unit"
            },
            "userBookedProduct": {
                "productOwner": "Product Owner",
                "userBookedProducts": "My booked products"
            },
            "userMessage": {
                "email": "Email",
                "from": "From",
                "message": "Message",
                "subject": "Subject",
                "dateSent": "Date Sent",
                "newMessage": "New Message",
                "senderEmail": "Sender Email",
                "userMessages": "User Messages"
            }

        },
        "dropDown": {
            "select": "Please Select"
        },
        "appRole": {
            "appRole": "App Role",
            "name": "Name",
            "addTo": "Add To",
            "concurrencyStamp": "Concurrency Stamp",
            "normalizedName": "Normalized Name",
            "removeFrom": "Remove From"

        },
        "appUser": {
            "appUser": "App User",
            "email": "Email",
            "firstname": "First Name",
            "lastname": "Last Name",
            "username": "Username",
            "concurrencyStamp": "ConcurrencyStamp",
            "emailConfirmed": "Email Confirmed",
            "lockoutEnabled": "Lockout Enabled",
            "lockoutEnd": "Lockout End",
            "normalizedEmail": "Normalized Email",
            "passwordHash": "Password Hash",
            "phoneNumber": "Phone Number",
            "securityStamp": "Security Stamp",
            "accessFailedCount": "Access Failed Count",
            "normalizedUserName": "Normalized User Name",
            "phoneNumberConfirmed": "Phone Number Confirmed",
            "twoFactorEnabled": "Two Factor Enabled"

        },
        "crud": {
            "confirmation": "Are you sure you want to delete this?",
            "create": "Create new",
            "delete": "Delete",
            "details": "Details",
            "edit": "Edit",
            "index": "Back to List",
            "reply": "Reply",
            "view": "View",
            "changeUserRoles": "Change User Role",
            "deleteConfirm": "Are sure you wish to delete this item?"
        },
        "account": {
            "email": "Email",
            "password": "Password",
            "logIn": "Log In",
            "confirmPassword": "Confirm Password",
            "firstName": "First name",
            "lastName": "Last name",
            "register": "register",
            "passwordDontMatch": "Passwords don't match!",

        },
        "common": {
            "minLength": "The input is too short",
            "maxLength": "The input is too long",
            "required": "The value is required",
            "loginProblem": "User/Password problem!",
            "alreadyRegistered": "User already registered!",
            "emailNotFound": "Email not found!"
           
        }

    },


    setAuthInfo: (token: string | null, firstName: string, lastName: string): void => { }


}

export const AppContext = React.createContext<IAppState>(initialAppState);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
