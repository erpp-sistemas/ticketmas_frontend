import React, { useEffect, useState } from 'react'


import ItemTicket from '../components/Tickets/ItemTicket'
import { TicketData } from '../@types/tickets'
import { CiCirclePlus } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import RoutesTickets from '../api/Tickets'
import { RoutesEtiquetas } from '../api/Etiquetas'
import Pagination from '../components/global/Pagination'

const Tickets:React.FC = () => {

  const [tickets,setTickets]=useState<TicketData[]>([])

  const navigate=useNavigate()
  
  const getAllTickets=()=>{ 
    RoutesTickets.Tickets().get()
    .then(res=>{
      console.log(res);
      
      setTickets(res)
    })
    .catch(res=>{
      console.log(res);
      
    })
  }



  useEffect(() => {
    getAllTickets()
  }, [])


  return (
    <div className=' w-full'>
        <div className='bsg-red-500'>
          categorias
        </div>
        <div className='bg-green-600a w-full h-full '>
            <div className='bg-pink-500a w-full h-16 flex justify-end'>
              <button onClick={()=>navigate("./newTicket")} className='text-white bg-primary m-2 px-4 mr-4 py-1 rounded-lg flex justify-center items-center font-bold' >Nuevo ticket <CiCirclePlus className='w-8 h-8 ml-3' /> </button>
            </div>
          <div className='bg-blue-500 max-h-[83vh] overflow-y-auto w-full mb-auto mx-auto flex items-start justify-between  flex-wrap  max-w-[1800px] '>
              {/* {
                tickets.map((item:TicketData)=>(
                  <ItemTicket key={item.id} {...item} />
                ))
              } */}

              <Pagination data={tickets} itemsPermitidosByPage={9} >
                <ItemTicket  />
              </Pagination>
          </div>
        </div>
    </div>
  )
}

export default Tickets