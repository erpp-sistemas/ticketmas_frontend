import React from 'react'
import { TicketsPrevewProps } from '../../@types/tickets'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { themeStyles } from '../../styles/theme.styles';

const PrevewTicket: React.FC<TicketsPrevewProps> = ({ closeTicket, ticket }) => {


  const theme = useSelector((slice: RootState) => slice.theme)

  const { id, asunto, fecha_inicio, etiqueta, prioridad, asignaciones, descripcion } = ticket
  const User = useSelector((slice: RootState) => slice.user)
  console.log(User.url_foto);



  return (
    <div onClick={() => closeTicket(undefined)} className='aparicion bg-[#282b2991] w-[100%] h-full absolute top-0 right-0 overflow-hidden'>
      <div onClick={(e) => { e.stopPropagation() }} className={`bg-gray-200 p-4 w-[70%] h-full ml-auto  desplegueBarnotification ${themeStyles[theme]}`}>
        <div className='bg-red-600s pt-[30px] flex justify-between  '>
          <div className='w-1/2 max-w-[300px]  mx-3'>

            <h4><span className='text-primary text-2xl font-bold '>Ticket:</span> <b className='text-2xl'># {id}</b> </h4>
            <div className='bg-gray-300 flex justify-center text-black my-2 '>
              <input type="checkbox" className='mx-3' />
              {fecha_inicio}
            </div>
            <div className=' py-1 my-2 rounded-md  text-black text-center' style={{ backgroundColor: etiqueta.color }}>
              {etiqueta.nombre_etiqueta}
            </div >

          </div>

          <div className='w-1/2 max-w-[300px]'>
            <div className='max-w-[230px]  rounded-lg' style={{ backgroundColor: `${prioridad.color}` }}>
              <div className='w-full h-full bg-[#a9a9a973]  rounded-lg py-2 flex justify-center items-center'>
                <div className={`mx-2 w-4 h-4 rounded-full`} style={{ backgroundColor: `${prioridad.color}` }}></div>
                Prioridad{prioridad.nombre_prioridad}
              </div>

            </div>
            <div className='w-full my-2 max-w-[230px] bg-white  rounded-lg py-2 flex justify-center items-center'>
              <div className="flex -space-x-4 rtl:space-x-reverse">
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={"https://www.ser0.mx/ser0/image/usuario/" + asignaciones[0].asignador_usuario.foto} title={asignaciones[0].asignador_usuario.nombre} />
                {[asignaciones[0], asignaciones[2], asignaciones[3]].filter(Boolean).map((as, index) => (
                  as.asignador_usuario && (
                    <img
                      key={index + 1}
                      className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                      src={`https://www.ser0.mx/ser0/image/usuario/${as.vinculacion_usuario.foto}`}
                      title={as.vinculacion_usuario.nombre}
                    />
                  )
                ))}
                {
                  asignaciones.length > 3 &&
                  <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
                }

              </div>
            </div>

          </div>
        </div>
        <div>
          <div className='ml-3 mt-3'>
            <p className='text-md xl:text-2xl'><b className='text-primary '>Asunto:</b> {asunto}</p>
          </div>

          <div className='bg-white text-black w-[95%] mx-auto p-4 rounded-xl mt-3 lg:max-h-[150px] md:max-h-[150px]  overflow-y-auto ' dangerouslySetInnerHTML={{ __html: descripcion }} ></div>
          <div className='w-[90%] mx-auto max-w-[820px] mt-6'>
            <button type='button' className='bg-primary text-white w-full py-1 mb-auto mx-auto   rounded-md text-lg  '>
              Crear lista de tareas
            </button>
          </div>

          <div className='flex w-full justify-center mt-6'>
          <img className="w-14 h-14 rounded-full mx-3" src={"https://www.ser0.mx/ser0/image/usuario/"+User.url_foto} alt="Rounded avatar"/>
            <input type="text" id="first_name" className=" w-[80%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 outline-none " placeholder='Escribe un comentario'  />
                {
                  
                }
          </div>

        </div>
      </div>
    </div>
  )
}

export default PrevewTicket