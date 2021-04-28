export interface IProduct {

    id?: string;
    description: string;
    isBooked: boolean,
    hasTransport: boolean;
    city?: string;
    county: string;
    locationDescription?: string;
    dateAdded?: string;
    unit: string;
    productAge: number;
    material?: [];
    height?: number;
    width?: number;
    depth?: number;
    color?: string;
    category?: string;
    condition?: string;
}
