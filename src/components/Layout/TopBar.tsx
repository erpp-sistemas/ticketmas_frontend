import React from 'react'
import { HiBell } from 'react-icons/hi'
import { VscColorMode } from 'react-icons/vsc'
import { ticketMas } from '../../assets'
import { ParamsBarNotificatio } from '../../@types/MenuBar'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setModeTheme } from '../../store/Slices/theme.slice'

const TopBar:React.FC<ParamsBarNotificatio> = ({setSateBar,stateBar}) => {

    const dispatch=useDispatch()
    const theme =useSelector((slice:RootState)=>slice.theme)

    const handelChangeStateBarNotification=()=>{
        setSateBar(!stateBar)
    }   
    
    const HandelChangeThemeMode=()=>{

        if(theme=="light"){
            dispatch(setModeTheme("dark"))
        }else{
            dispatch(setModeTheme("light"))
        }
        console.log(theme);
        
    }


    return (

        <div className='bg-primary w-full h-16 flex  absolute z-40 top-0'> 
            
            <img src={ticketMas.logoLigth} className='p-2 ml-6' alt="" />

            <span className='flex ml-auto'>
                <span className='my-auto  relative cursor-pointer' onClick={handelChangeStateBarNotification}>
                    <span className='bg-red-500 text-white absolute z-10 right-0 rounded-full  w-5 h-5 flex justify-center items-center'>
                        <p>5</p>
                    </span>
                    <HiBell className='text-cyan-500 mx-2 my-auto p-1 w-8 h-8 bg-white rounded-full cursor-pointer' />
                </span>
                <span className='my-auto mr-5  cursor-pointer' onClick={HandelChangeThemeMode}>
                    <VscColorMode className='text-cyan-500 mx-2 my-auto p-1 w-8 h-8 bg-white rounded-full cursor-pointer' />
                </span>
            </span>
           
        </div>
       
  
    )
}

export default TopBar