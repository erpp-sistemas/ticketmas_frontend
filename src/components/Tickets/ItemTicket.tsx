

import React, { useState } from 'react'
import { TicketData } from '../../@types/tickets'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { themeItemStyles } from '../../styles/theme.styles'

const ItemTicket: React.FC<TicketData> = ({data}) => {
    //@ts-ignore
        const {asignaciones,asunto,etiqueta,fecha_inicio,id,prioridad}=data
    const theme = useSelector((slice: RootState) => slice.theme)


    return (
        <div className={`${themeItemStyles[theme]} m-3  px-3 py-2 rounded-md w-[30%] max-h-[200px] h-[200px]  flex-wrap min-w-[320px] max-w-[500px] inline-block`}>
            <div className='flex w-full justify-around'>
                <div className='flex items-center w-[70%] '>
                    <img className='w-12 h-12 rounded-full m-2' src={`https://www.ser0.mx/ser0/image/usuario/${asignaciones[0].asignador_usuario.foto}`} alt="" />
                    <span>
                    <p className=''>{asignaciones[0].asignador_usuario.nombre}</p>
                    <p className='text-sm text-primary '>{asignaciones[0].asignador_usuario.nombre}</p>
                    </span>
                </div>
                <div className=' w-[50%] text-black flex flex-wrap text-xs '>
                    <div title='Prioridad' className={` ${prioridad.color} m-auto bg w-[90%] h-28%  rounded-lg`} style={{backgroundColor:`${prioridad.color}`}} >
                        <div className='w-full h-full bg-[#a9a9a973] rounded-lg py-[2px]'>
                        <span className='flex items-center justify-center'>
                            <div className={`mx-2 w-4 h-4 rounded-full`} style={{backgroundColor:`${prioridad.color}`}}></div>
                            {prioridad.nombre_prioridad}
                        </span>

                        </div>
                        
                    </div>
                    <div className='mx-auto w-[90%] h-[28%] bg-gray-300  flex items-center text-center'>
                        <input type="checkbox" className='mx-2' />
                        <p className='mx-auto'>{fecha_inicio}</p>
                    </div>
                    <div className={`  w-[90%] mx-auto h-[28%] text-center flex items-center justify-center rounded-md`} style={{backgroundColor:`${etiqueta.color}`}}>
                        {etiqueta.nombre_etiqueta}
                    </div>
                </div>
            </div>
            <span className='mt-auto w-full'>
                <div className=' my-1 mb-3'>
                    <p>  <b className='text-primary'>ASUNTO :</b> {asunto}</p>
                </div>
                <div className='flex justify-between '>
                    <span>
                        <p><b className='text-primary'>TICKET :</b> {id}</p>
                    </span>
                    <span>
                        <button className='bg-primary px-3 py-1 rounded-md text-white ' >
                            Ver Completo
                        </button>
                    </span>
                </div>
            </span>
        </div>
    )
}

export default ItemTicket







