import { ReactElement } from "react";


export interface ItemMenuBar{
    icon:ReactElement
    title:string
    route:string
}

export interface ParamsBarNotificatio {
    stateBar:boolean
    setSateBar:(state:boolean)=>void
}



