export interface ILanguageResources {
    "views": {
        "shared": {
            "layout": {
                "languages": string;
            },
            "buttons": {
                "create": string;
                "delete": string;
                "remove": string;
                "save": string;
                "search": string;
                "send": string;
            },
            "loginPartial": {
                "hello": string;
                "login": string;
                "logout": string;
                "register": string;
            }
        },
        
    },
    "bllAppDTO": {
        "bookings": {
            "booking": string;
            "findAProduct": string;
            "reserve": string;
            "timeBooked": string;
            "until": string;
        },
        "categories": {
            "category": string;
            "name": string;
        },
        "cities": {
            "city": string;
            "name": string;
        },
        "conditions": {
            "condition": string;
            "description": string;
        },
        "counties": {
            "county": string;
            "name": string;
        },
        "materials": {
            "material": string;
            "name": string;
            "comment": string;
        },
        "messageForms": {
            "email": string;
            "message": string;
            "subject": string;
            "dateSent": string;
            "messageForm": string;
            "sendMessage": string;
        },
        "pictures":{
            "picture": string;
            "url": string;
            "productName": string;
        },
        "productMaterials": {
            "productMaterial": string;
        },
        "products": {
            "product": string;
            "category": string;
            "city": string;
            "county": string;
            "color": string;
            "description": string;
            "depth": string;
            "dateAdded": string;
            "height": string;
            "width": string;
            "locationDescription": string;
            "location": string;
            "hasTransport": string;
            "isBooked": string;
            "myProduct": string;
            "material": string;
            "unit": string;
            "recentlyAddedProducts": string;
            "condition": string;
            "picture": string;
            "productAge": string;
            "size": string;
        },
        "units":{
            "name": string;
            "unit": string;
        },
        "userBookedProduct": {
            "productOwner": string;
            "userBookedProducts": string;
        },
        "userMessage": {
            "email": string;
            "from": string;
            "message": string;
            "subject": string;
            "dateSent": string;
            "newMessage": string;
            "senderEmail": string;
            "userMessages": string;
        }

    },
    "dropDown": {
        "select": string;
    },
    "appRole": {
        "appRole": string;
        "name": string;
        "addTo": string;
        "concurrencyStamp": string;
        "normalizedName": string;
        "removeFrom": string;

    },
    "appUser": {
        "appUser": string;
        "email": string;
        "firstname": string;
        "lastname": string;
        "username": string;
        "concurrencyStamp": string;
        "emailConfirmed": string;
        "lockoutEnabled": string;
        "lockoutEnd": string;
        "normalizedEmail": string;
        "passwordHash": string;
        "phoneNumber": string;
        "securityStamp": string;
        "accessFailedCount": string;
        "normalizedUserName": string;
        "phoneNumberConfirmed": string;
        "twoFactorEnabled": string;

    },
    "crud": {
        "confirmation": string;
        "create": string;
        "delete": string;
        "details": string;
        "edit": string;
        "index": string;
        "reply": string;
        "view": string;
        "changeUserRoles": string;
        "deleteConfirm": string;
    },
    "account": {
        "email": string;
        "password": string;
        "logIn": string;
        "confirmPassword": string;
        "firstName": string;
        "lastName": string;
        "register": string;
        "passwordDontMatch": string;
    },
    "common": {
        "minLength": string;
        "maxLength": string;
        "required": string;
        "loginProblem": string;
        "alreadyRegistered": string;
        "emailNotFound": string;
    }

}