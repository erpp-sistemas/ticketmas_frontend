
import { Outlet } from 'react-router-dom'
import MenuBar from '../../components/Layout/MenuBar'
import TopBar from '../../components/Layout/TopBar'
import BarNotification from '../../components/Layout/BarNotification'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { themeStyles } from '../../styles/theme.styles'

const index = () => {
    const [openBarNotification,setOpenBarNotification]=useState<boolean>(false)

    const theme=useSelector((slice:RootState)=>slice.theme)
      

  return (
    <div className={`h-svh overflow-y-hidden  ${themeStyles[theme]} `}>
            <TopBar setSateBar={setOpenBarNotification} stateBar={openBarNotification}/>
        <div className='w-full flex relative overflow-hidden'>
            <MenuBar/>  
            <Outlet/>
            <BarNotification stateBar={openBarNotification} setSateBar={setOpenBarNotification}/>
        </div>
    </div>
  )
}

export default index