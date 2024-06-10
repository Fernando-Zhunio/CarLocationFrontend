export interface IResponse<T> {
    
}

export interface IResponsePaginator<T> {
    items: T[];
    total: number;
}

export interface IResponseCreateOrEditDialog<T> {
    item: T;
    isEdit: boolean;
}