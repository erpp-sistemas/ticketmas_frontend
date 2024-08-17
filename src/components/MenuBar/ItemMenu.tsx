import React, { useState } from 'react'

import { ItemMenuBar } from '../../@types/MenuBar'


const ItemMenu = (data:ItemMenuBar) => {

    const [openPage,setOpenPage]=useState<boolean>(false)

  return (
   <div className='relative group my-4 ' onClick={()=>setOpenPage(!openPage)} >
    <div className={`${openPage?"w-[0%] group-hover:w-[10%]":"w-[95%]  "}  absolute text-nowrap duration-300 overflow-hidden flex items-center  text-primary bg-white cursor-pointer rounded-r-2xl mr-2`}>
       <span className='pl-3 flex items-center'>
       {data.icon}
       <p className='ml-2'>
        {data.title}
       </p>
       </span>
    </div>

     <div className='flex items-center ml-3 text-white cursor-pointer' >
       <span className='w-10 h-10' >
        {data.icon}
        </span> 
       <p className='ml-2'>
       {data.title}
       </p>
    </div>
   </div>
  )
}

export default ItemMenu