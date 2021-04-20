import { TEntity } from '@/store';
import Axios from 'axios';
import { IJwtResponse } from "../store/index";

export class BaseService<TEntity> {

    private axios = Axios.create(
        {
            baseURL: 'https://localhost:5001',
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

   

    async getAll(name: string, jwt: string): Promise<TEntity[]> {
        const url = "" + name;
        try {
            const response = await this.axios.get<TEntity[]>(url, { headers: { Authorization: 'Bearer ' + jwt } });
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            return [];
        }
    }

    async get(id: string, jwt: string): Promise<TEntity> {
        const url = "" + id;
        try {
            const response = await this.axios.get<TEntity>(url, { headers: { Authorization: 'Bearer ' + jwt } });
            if (response.status === 200) {
                return response.data;
            }
            return {} as TEntity;
        } catch (error) {
            return {} as TEntity;
        }
    }

    async create(entity: TEntity, jwt: string): Promise<TEntity> {
        const url = ""
        try {
            const response = await this.axios.post<TEntity>(url, entity, { headers: { Authorization: 'Bearer ' + jwt } });
            if (response.status === 200) {
                return response.data;
            }
            return {} as TEntity;
        } catch (error) {
            return {} as TEntity;
        }
    }

    async edit(entity: TEntity, id: string, jwt: string): Promise<TEntity> {
        const url = "" + id;
        try {
            const response = await this.axios.put<TEntity>(url, entity, { headers: { Authorization: 'Bearer ' + jwt } });
            if (response.status === 200) {
                return response.data;
            }
            return {} as TEntity;
        } catch (error) {
            return {} as TEntity;
        }
    }

    async delete(id: string, jwt: string): Promise<void> {
        const url = "" + id;
        try {
            const response = await this.axios.delete<TEntity>(url, { headers: { Authorization: 'Bearer ' + jwt } });
        } catch (error) {
        }
    }
}
