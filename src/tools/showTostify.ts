import { StatusTostify } from "../@types/tostify"
import { createTostify } from "../store/Slices/tostifi.slice"
import { dispatch } from "../store"



 const showTostyfy=(message:string,status?:StatusTostify)=>{    
    dispatch(createTostify({message,status:status?status:"success"}))
}



export default showTostyfy


