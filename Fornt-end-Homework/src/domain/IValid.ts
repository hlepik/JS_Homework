export interface IValid {

    id: string;
    validUntil: string
    legs: [{
        id: string;
        routeInfo: {
            id: string;
            from: {
                id: string;
                name: string
            }
            to: {
                id: string;
                name: string
            }
            distance: number;
          
        };
        providers: {
            id: string;
            company:{
                id: string;
                name:string;
            }
            price: number;
            flightStart: string;
            flightEnd: string
        }
    }];
    
} 