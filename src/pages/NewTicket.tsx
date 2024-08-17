import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NewTicketData } from '../@types/tickets/NewTicket'
import RoutesTickets from '../api/Tickets'
import { RoutesEtiquetas } from '../api/Etiquetas'
import { RoutesAreas } from './Areas'
import { AreasInterface, EtiquetaInterface } from '../@types/Areas'
import showTostyfy from '../tools/showTostify'
import EditorText from '../components/global/EditorText'
import { useNavigate } from 'react-router-dom'




const NewTicket: React.FC = () => {
  const [descriptionTicket,setDescriptionTicket]=useState("")
  const [etiquetas, setEtiquetas] = useState<EtiquetaInterface[]>([])
  const [Areas, setAreas] = useState<AreasInterface[]>([])

  const navigate=useNavigate()

  const { handleSubmit, reset, register } = useForm<NewTicketData>()


  const getEtiquetas = (area: string|number) => {
    console.log();
      if(area!=""){
        RoutesEtiquetas.EtiquetasArea({ id: area }).get()
        .then(res => {;
          setEtiquetas(res) 
        })
        .catch(()=>setEtiquetas([]))
  
      }
    
    }
    
  const getAllAreas = () => {
    RoutesAreas.Areas().get() 
      .then(res => {
        setAreas(res)
      })
  }


  useEffect(() => {
    getAllAreas()


  }, [])




  const handelSubmitTicket: SubmitHandler<NewTicketData> = (data): void => {

    console.log(data);
    const dataFinal={
      ...data,
      prioridad_id: 3,
      area_id: Number(data.area_id),
      etiqueta_id:Number(data.etiqueta_id),
      estatus_id:1,
      descripcion:descriptionTicket
    }
    console.log(dataFinal);
    
    
    if(descriptionTicket==""){return showTostyfy("Aun te falta la  descripción del ticket ",'warning')}
  
    RoutesTickets.Tickets({data:dataFinal}).post()
      .then(res => {
        showTostyfy("se creo el ticket","success") 
        navigate("/dashboard")
      })
      .catch(res => {
        console.log(res.response);
        showTostyfy(res.response.data.message,'error')
      })
  }




  return (
    <form onSubmit={handleSubmit(handelSubmitTicket)} className='flex w-full bg-red-500s mt-2 justify-center max-w-[1600px] mx-auto '>
      <section className='w-[65%] mx-auto bg-green-500s '>
        <div className='w-[90%] mx-auto '>
          <div className="mb-6 w-full mx-auto">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-primary ">Asunto</label>
            <input required type="text" {...register("asunto")} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5   w-full outline-none " />
          </div>

          <EditorText setValue={setDescriptionTicket}  />
        
        </div>
        <div className='w-[90%] mx-auto max-w-[820px] mt-6'>
          <button type='button' className='bg-primary text-white w-full h-12 mb-auto mx-auto   rounded-md text-[20px]  '>
            Crear lista de tareas
          </button>
        </div>

      </section>
      <section className='w-[30%] px-2 bg-blue-700s bg-gray-300'>

        <label htmlFor="large" className="block mb-2 text-base font-medium text-black ">Area</label>
        <select
          {...register("area_id", {
            onChange: (e) => {
              getEtiquetas(e.target.value);
            }
          })}
          required
          className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">ESCOGE UNA AREA</option>
          {
            Areas.map(a => (
              <option key={a.id} value={a.id}>{a.nombre}</option>
            ))
          }
        </select>
        <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Etiqueta</label>
        <select required   {...register("etiqueta_id")} className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
          <option selected value="">Escoge una Etiqueta</option>
          {
            etiquetas.map(e => (
              <option value={e.id}>{e.nombre}</option>
            ))
          }


        </select>


        <div className="flex items-center justify-center w-full mt-10 h-[35%] max-h-[250px] ">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full min-h-[100%] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100  dark:hover:border-gray-500 ">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>

       <div className='flex'>
       <button type='submit' className='bg-primary text-white w-[90%] mx-auto my-5 py-4 rounded-md text-[20px] max-w-[220px]'>
          Guardar Ticket
        </button>
       </div>

      </section>

    </form>
  )
}

export default NewTicket