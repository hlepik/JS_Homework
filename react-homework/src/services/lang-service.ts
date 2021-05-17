import Axios, { AxiosError } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { ISupportedLanguage } from '../dto/ISupportedLanguage';
import { ILanguageResources } from '../dto/ILanguageResources';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';

export class LangService {

    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    static async getSupportedLanguages(url: string = "", langName: string = ""): Promise<IFetchResponse<ISupportedLanguage[] | IMessages>> {


        if (langName !== "") {
            url = url + '?culture=' + langName;
        }

        try {
            let response = await this.axios.get(url);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

    static async getLanguageResources(url: string = "", langName: string = ""): Promise<IFetchResponse<ILanguageResources | IMessages>> {


        if (langName !== "") {
            url = url + '?culture=' + langName;
        }

        try {
            let response = await this.axios.get(url);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

}