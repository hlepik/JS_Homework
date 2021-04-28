export interface IFetchResponse<TData> {
    statusCode: number;
    errorMessage?: string | null;
    data: TData | null;
}
