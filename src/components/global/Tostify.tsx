import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Bounce, toast, ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../store';
import { BodyTostify } from '../../@types/tostify';
import showTostyfy from '../../tools/showTostify';
  

const Tostify:React.FC = () => {

    const bodyTostify=useSelector((slice:RootState)=>slice.tostify) 
    const theme=useSelector((slice:RootState)=>slice.theme) 


const showTostify=(body:BodyTostify)=>{
    
    toast[body.status](body.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
        });
       showTostyfy("")
}


    useEffect(()=>{
        if(bodyTostify.message!==""){
            showTostify(bodyTostify)
        } 
    },[bodyTostify])




  return (
   <ToastContainer />
  )
}

export default Tostify