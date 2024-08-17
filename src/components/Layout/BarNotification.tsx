import React from 'react'
import { ParamsBarNotificatio } from '../../@types/MenuBar'

const BarNotification:React.FC<ParamsBarNotificatio> = ({setSateBar,stateBar}) => {

  return (
  <>
  {
    stateBar&&
    <div onClick={()=>setSateBar(false)} className='aparicion h-svh w-[100%] absolute bg-[#282b2991] right-0 z-10 flex justify-end'>       
            <div onClick={(e)=> e.stopPropagation()} className='bg-white w-[20%] max-w-[250px] desplegueBarnotification '>
                    soy la barra
            </div>
    </div>
  }
  </>
  )
}

export default BarNotification