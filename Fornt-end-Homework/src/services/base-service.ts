import { HttpClient } from "aurelia";
import { IFetchResponse } from "../types/IFetchResponse";
import { IQueryParams } from "../types/IQueryParams";
import { IJwt } from "../types/IJwt";


export interface IEntityId {
    id: string;
}

export class BaseService<TEntity> {

    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient, private jwt?: string) {
      
    }

    private authHeaders = this.jwt !== undefined ?
        {
            'Authorization': 'Bearer ' + this.jwt
        }
        :
        {

        };


    async getAll(queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity[]>> {
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            // TODO: add query params to url
        }

        try {

            const response = await this.httpClient.fetch(
                url,
                {
                    cache: "no-store",
                    headers: this.authHeaders
                }
            );
            if (response.ok) {
                const data = (await response.json()) as TEntity[];
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

    async get(id: string, queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + '/' + id;

        if (queryParams !== undefined) {
            // TODO: add query params to url
        }

        try {
            const response = await this.httpClient.fetch(url, { cache: "no-store", headers: this.authHeaders });
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }
    async create(entity: TEntity, queryParams?: IQueryParams):  Promise<IFetchResponse<TEntity>>{
     
        let url = this.apiEndpointUrl;
    
        let entityStr = JSON.stringify(entity);



       try {
        const response = await this.httpClient.post(url, entityStr, { cache: "no-store", headers: this.authHeaders })


            if (response.ok) {
        
                return {
                    statusCode: response.status,
                    data: undefined,
                }
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
            
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
    
    async update(entity: TEntity, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + '/' + entity['id'];


        let entityStr = JSON.stringify(entity);

        console.log(entityStr)

        try {
            const response = await this.httpClient.put(url, entityStr, { cache: "no-store", headers: this.authHeaders });


            if (response.ok) {
                return {
                    statusCode: response.status,
                    data: undefined,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async delete(id: string):  Promise<IFetchResponse<TEntity[]>>{
     
        let url = this.apiEndpointUrl;
        url = url + '/' + id;

        try {
            let body = {id};
            let bodyStr = JSON.stringify(body);
            console.log(bodyStr);

            const response = await this.httpClient.delete(url, bodyStr , { cache: "no-store" , headers: this.authHeaders });

            if (response.ok) {
                return {
                    statusCode: response.status,
                    data: undefined,
                 
                }
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        
        }
    }


}

