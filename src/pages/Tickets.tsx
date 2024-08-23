import React, { useEffect, useState } from 'react'


import ItemTicket from '../components/Tickets/ItemTicket'
import { TicketLigth } from '../@types/tickets'
import { CiCirclePlus } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import RoutesTickets from '../api/Tickets'

import Pagination from '../components/global/Pagination'
import showTostyfy from '../tools/showTostify'
import PrevewTicket from '../components/Tickets/PrevewTicket'

const Tickets:React.FC = () => {

  const [tickets,setTickets]=useState<TicketLigth[]>([])
  const [ticketSelect,setTicketsSelect]=useState<TicketLigth>()

  const navigate=useNavigate()
  
  const getAllTickets=()=>{ 
    RoutesTickets.Tickets().get()
    .then(res=>{
      setTickets(res)
    })
    .catch(res=>{
      console.log(res);
    })
  }

  const HandelShowTicketSelect=(idTicket:string)=>{
    RoutesTickets.Tickets({id:idTicket}).get()
      .then(res=>setTicketsSelect(res))
      .catch(()=>showTostyfy("Error al cargar el ticket","error"))
  }


  useEffect(() => {
    getAllTickets()
  }, [])


  return (
    <div className='bg-red-500s w-full h-full   '>
        <div className=''>
          categorias
        </div>
        <div className='bg-green-600s mt-auto w-full h-[80%] '>
            <div className='bg-pink-500a w-full h-16 flex justify-end'>
              <button onClick={()=>navigate("./newTicket")} className='text-white bg-primary m-2 px-4 mr-4 py-1 rounded-lg flex justify-center items-center font-bold' >Nuevo ticket <CiCirclePlus className='w-8 h-8 ml-3' /> </button>
            </div>
          <div className='bg-blue-500s h-full w-full mb-uto mx-auto overflow-y-auto   max-w-[1800px] '>

              <Pagination data={tickets} itemsPermitidosByPage={9} >
                <ItemTicket openTicket={HandelShowTicketSelect}  data={{}as TicketLigth} />
              </Pagination>
          </div>
        </div>
        {
          ticketSelect&&
          <PrevewTicket closeTicket={setTicketsSelect} ticket={ticketSelect}/>
        }
    </div>
  )
}

export default Tickets