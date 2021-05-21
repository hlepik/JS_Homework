export interface IProduct {
    id?: string;
    description: string;
    isBooked: boolean,
    hasTransport: boolean;
    cityId?: string;
    countyId: string;
    locationDescription?: string;
    dateAdded: string;
    unitName?: string;
    productAge?: number;
    material?: [];
    pictureUrls?: [];
    height?: number;
    width?: number;
    depth?: number;
    color?: string;
    categoryId: string;
    conditionId: string;
    appUserId: string;
    countyName?: string;
    cityName?: string;
    conditionName?: string;
    categoryName?: string;
    unitId?: string;

}