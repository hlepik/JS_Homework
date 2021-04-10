import { HttpClient } from "aurelia";
import { IFetchResponse } from "../types/IFetchResponse";
import { IQueryParams } from "../types/IQueryParams";

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

    async get(id: string, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
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

}
