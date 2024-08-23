import React, { ReactElement, useEffect, useMemo, useState } from "react";

import { IoIosArrowDropupCircle } from "react-icons/io";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { TicketData, TicketLigth } from "../../@types/tickets";

interface PaginationParams {
   data: TicketLigth[];
   children: ReactElement<TicketData>;
   itemsPermitidosByPage: number;
 }


const Pagination:React.FC<PaginationParams>= ({ data ,children,itemsPermitidosByPage }) => {
   const [itemsPermitidos, setItemsPermitidos] = useState(itemsPermitidosByPage); //*Items permitidos por pagina
   const [paginas, setPaginas] = useState(1); //*Paginas totales que se tendran
   const [pagina, setPagina] = useState(1); //* La pagina actual que se visualiza
   const [animacion, setAnimacion] = useState(false); 

   useEffect(() => {
      setPaginas(Math.ceil(data.length / itemsPermitidos));
   }, [data, itemsPermitidos]);

   useEffect(() => {
      setAnimacion(true)
      setTimeout(() => {
         setAnimacion(false)
      }, 300);
   }, [pagina ]);
   //? ///////////////////////////////////////////////////////////////
   //* Genera los items de cada pagina dependiendo lo permitido y en la pagina donde se encuentre
   const itemsMemo = useMemo(() => {
    const max = pagina * itemsPermitidos;
    const min = (pagina - 1) * itemsPermitidos;
        return data.slice(min, max);
     
   }, [pagina, paginas, data]);
   //? ///////////////////////////////////////////////////////////////

   //* Genera la cantidad de paginas
   const paginasMemo = useMemo(() => {
     
      const paginasInstance = [];
      const limitePaginas=10
      for (let p = 1; p <= paginas; p++) {
         if (paginasInstance.length < limitePaginas) {
            const page = { id: pagina > limitePaginas ? p + (pagina - limitePaginas) : p };

            if (page.id <= paginas) {
               paginasInstance.push(page);
            }
         }
      }

      return paginasInstance;
   }, [paginas, pagina,data]);

   //? ///////////////////////////////////////////////////////////////

   const NextPage = () => {
      if (pagina < paginas) {
         setPagina(pagina + 1);
      }
   };
   const prevewPage = () => {
      if (pagina > 1) {
         console.log(pagina - 1);
         setPagina(pagina - 1);
      }
   };
   //? ///////////////////////////////////////////////////////////////

   const handeltOnchageLimit = (e:any) => {
      const value = e.target.value;
      setItemsPermitidos(value);
      setPagina(1);
   };



   return (
      <div className=" max-w-7xl mx-auto  w-full  flex flex-wrap  h-full">
         {/* 
            <a href="#top" className={`${itemsPermitidos == 10 } p-3 rounded-full bg-primary w-auto fixed bottom-6 right-0 xl:mr-[10%] `}>
               <IoIosArrowDropupCircle />
            </a> 
         */}

       <div className={`${animacion&&'aparicion' } h-fit w-full  justify-center items-center p-3  overflow-y-auto mb-auto :flex flex-wrap`}>
       <div className=" max-w-6xl mx-auto flex justify-between w-full h-7 ">
            <span> Total : {data.length}</span>
            <span> Pagina: {pagina}</span>
         </div>
        
         {
          itemsMemo.map((item, index) =>
            React.cloneElement(children, { data: item, key: index + 1 })
          )
        }
        
       </div>
{
   data.length>10&&
<nav className="w-full flex justify-center items-center pys-6 mt-auto">
   <ul className="flex items-center -space-x-px h-10 text-base flex-wrap">
      <li>
         <button onClick={prevewPage} className="mr-3 rounded-l-lg  flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-100 bg-primary border border-e-0 border-gray-300 rounded-s-lg hover:bg-cyan-400  ">
         <FaCircleArrowLeft />
         </button>
      </li>

      {paginasMemo.length &&
         paginasMemo?.map((p) => (
            <li key={p.id}>
               <button onClick={() => setPagina(p.id)} className={`rounded-md mx-1 flex items-center   justify-center px-4 h-10 leading-tight   border border-gray-300 hover:bg-cyan-400 text-black hover:text-gray-100  dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white ${pagina == p.id ? "bg-primary text-white" : "dark:bg-gray-800 bg-white dark:text-gray-400 "}`}>
                  {p.id}
               </button>
            </li>
         ))}

      <li >
         <button onClick={NextPage} className="mx-3 rounded-r-lg flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-100 bg-primary border border-e-0 border-gray-300 rounded-s-lg hover:bg-cyan-400  ">
         <FaCircleArrowRight />
         </button>
      </li>

      <li>
         <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            limite
            <select onChange={handeltOnchageLimit} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ml-1 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
               <option value="9">9</option>
               <option value="36">36</option>
               <option value="90">90</option>
               <option value="500">500</option>
            </select>
         </span>
      </li>
   </ul>
</nav>
}
      </div>
   );
};

export default Pagination;
