import React from 'react'
import { assetsGlobal, ticketMas } from '../../assets'
import ItemMenu from '../MenuBar/ItemMenu'
import { HiOutlineServer, HiTicket } from 'react-icons/hi'
import { BsGraphUpArrow } from 'react-icons/bs'
import { FaTrashCan } from 'react-icons/fa6'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { themeStyles } from '../../styles/theme.styles'


const MenuBar:React.FC = () => {

    const theme=useSelector((slice:RootState)=>slice.theme)
    return (
        <div className='bg-primary w-[20%] max-w-[250px] min-h-svh z-[11] flex flex-wrap overflow-hidden'>
            <span className='w-full'>
                <div className={`bg-gray-200 w-[90%] m-auto flex mt-12 py-7 rounded-t-2xl ${themeStyles[theme]}`}>
                    <img src={ticketMas.avatar} className='w-15 h-12 mx-2' alt="" />
                    <div className='text-center'>
                        Ramon Calderon
                        <div className='text-primary'>Sistemas</div>
                    </div>
                </div>

                <div className=' w-full mb-auto'>
                    <ItemMenu icon={<HiTicket className='w-10 h-10' />} route='/' title='Mis tickets' />
                    <ItemMenu icon={<BsGraphUpArrow className='w-9 h-9' />} route='/' title='Reportes' />
                    <ItemMenu icon={<FaTrashCan className='w-9 h-9' />} route='/' title='Papelera' />
                    <ItemMenu icon={<HiOutlineServer className='w-10 h-10' />} route='/' title='Mis etiquetas' />
                </div>
            </span>

            <div className='bg-green-60 w-full h-[20%] relative mt-auto '>
                <img src={assetsGlobal.hondasTicketMasLigth} className='absolute z-[1] bottom-[0px] w-[90%] xl:w-full  xl:scale-150 mt-auto' alt="" />
            </div>

        </div>
    )
}

export default MenuBar
