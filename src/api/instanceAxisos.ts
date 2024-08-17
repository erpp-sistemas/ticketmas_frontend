

import axios, { AxiosInstance } from "axios";
import { BaseRequest, ParamsRequest, RouteParams } from "../@types/axios";




export const instanceAxios=axios.create({
    baseURL:'http://localhost:3000/api/ticketmas/v1',
    withCredentials: true,
})


export class TypeRequest {
    
     private data?: object|null;
     private url: string;

    constructor ({ url, data }: ParamsRequest,private readonly instanceAxios:AxiosInstance){
        this.data=data
        this.url=url
    }

    private peticionBase=async(typePeticion:BaseRequest)=>{
        try{
            const res=await typePeticion
            return res.data
        }catch(error:any){
                console.log(error)
                console.warn(">>>>>>>>>>>>⚠️⚠️ ERROR ⚠️⚠️<<<<<<<<<<<<<<<<<",error.message)
                console.warn("⚠️⚠️",error?.response)
                if(error?.response.status==401){
                    // logoutTool()
                }
    
            throw error
        }
    }

    get(){
        return this.peticionBase(this.instanceAxios.get(this.url))
    }
    post(){
        return this.peticionBase(this.instanceAxios.post(this.url,this.data))
    }
    put(){
        return this.peticionBase(this.instanceAxios.put(this.url,this.data))
    }
    destroy(){
        return this.peticionBase(this.instanceAxios.delete(this.url))
    }   

}


interface requestData{
    url:string
    id?:string
    data?:object|null
}


export class Routes<T extends Record<string, string>,L extends  { [K in keyof T]: (data?: object, id?: string) => TypeRequest } > {
    private routes: T;

    constructor(
        routes: T,
        private  useInstanceAxios:AxiosInstance
    ) {

        this.routes = routes;
    }

    protected BaseRoutes({ url, data, id }: requestData): TypeRequest {
        return new TypeRequest({ url: `/${url}/${id || ""}`, data },this.useInstanceAxios);
    }

   
    protected RoutesFuncionales():L {
        const routeFunctions = {} as L; 
        for (const key in this.routes) {
            (routeFunctions as any)[key] = (params:RouteParams={}) => this.BaseRoutes({ url: this.routes[key],data:params.data , id:params.id });
        } 
     
        return routeFunctions;
    }

    static GenerateRoutes<T extends Record<string, string>>(routes: T,instanceAxios:AxiosInstance): { [K in keyof T]: (data?: object, id?: string) => TypeRequest } {
        
        const instance = new Routes(routes,instanceAxios);
        return instance.RoutesFuncionales();
    }
}

export const Fraxx=()=>{
    const hooks={
        GenerateRoutes:Routes.GenerateRoutes
    }
    return hooks
}




