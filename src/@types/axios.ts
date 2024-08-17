import { AxiosResponse } from "axios"


export interface ParamsRequest{
     url:string
     data?:object|null
}


export interface ParamsApisRoutes{
     (data?:object,id?:string):Promise<void>
}


export interface RouteParams{
     id?:string
     data?:object
 }

export type BaseRequest= Promise<AxiosResponse<any, any>>;





