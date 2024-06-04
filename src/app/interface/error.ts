export interface IErrorSources {
    path: string | number;
    message: string;
}

export type TGenericError = {
    statusCode: number;
    message: string;
    errorSources: IErrorSources[];
};
