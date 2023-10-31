export interface ICategory {
    name: string,
    desc?: string,
    seoUrl: string,
    seoDesc: string,
    categoryText?: string
}

interface ICategoryResponse {
    "name": string,
    "desc": string,
    "seoUrl": string,
    "seoDesc": string,
    "categoryText": string,
    "_id": string
}

export interface ICreateCategoryResponse {
    data: ICategoryResponse,
    status: boolean,
    error: null | string
}