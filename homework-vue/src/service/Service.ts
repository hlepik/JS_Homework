import Axios from 'axios';
import store from "@/store";
import { IFetchResponse } from './../domain/IFetchResponse';

export class Service<TEntity> {
    async getAll(url: string): Promise<TEntity[]> {
        const response = await Axios.get<TEntity[]>(url, { headers: { Authorization: 'Bearer ' + store.state.token } });

        if (response.status === 200) {
            return response.data;
        }
        return [];
    }

    async get(url: string): Promise<IFetchResponse<TEntity | null>> {
        try {
            const response = await Axios.get<TEntity>(url, { headers: { Authorization: 'Bearer ' + store.state.token } });
            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
                data: null
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
                data: null
            };
        }
    }

    async create(entity: TEntity, url: string): Promise<IFetchResponse<TEntity | null>> {
        try {
            const response = await Axios.post(url, entity, { headers: { Authorization: 'Bearer ' + store.state.token } });

            if (response.status >= 200 && response.status < 400) {
                return {
                    statusCode: response.status,
                    data: null,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
                data: null
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
                data: null
            };
        }
    }

    async edit(entity: TEntity, url: string): Promise<IFetchResponse<TEntity | null>> {
        try {
            const response = await Axios.put(url, entity, { headers: { Authorization: 'Bearer ' + store.state.token } });

            if (response.status >= 200 && response.status < 400) {
                return {
                    statusCode: response.status,
                    data: null,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
                data: null
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
                data: null
            };
        }
    }

    async delete(url: string): Promise<IFetchResponse<TEntity | null>> {
        try {
            const response = await Axios.delete(url, { headers: { Authorization: 'Bearer ' + store.state.token } });

            if (response.status >= 200 && response.status < 400) {
                return {
                    statusCode: response.status,
                    data: null,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
                data: null
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
                data: null
            };
        }
    }
}
