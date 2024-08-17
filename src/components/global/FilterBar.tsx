import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";


interface Categorias{
   id:number,
   nombre:string
}

interface FilterBarParams{
   categorias:Categorias[]
   items:Record<string,string>[]
   setItems:(items:object[])=>void
   setCategoriaSeleccionada:(categoria:number|string)=>void
   keysFilter:string[]
}


const FilterBar:React.FC<FilterBarParams> = ({ categorias, items, setItems, setCategoriaSeleccionada,keysFilter}) => {

   const [instance, setInstance] = useState<Record<string,string>[]>([]);
   const [itemsOriginal, setItemsOriginal] = useState<Record<string,string>[]>(items);
   
   const [searchParams]=useSearchParams()

   const categoriaParams=searchParams.get('categoria')
   const [categoriaSelect, SetCategoriaSelect] = useState(categoriaParams||"All");
   const { handleSubmit, reset, watch, register } = useForm();

   useEffect(() => {

      if (items.length && !itemsOriginal.length) {
         setItemsOriginal(items);
         setCategoriaSeleccionada&&
         setCategoriaSeleccionada(categoriaParams||categoriaSelect);
      }
    
   }, [items]);


   useEffect(() => {
      categoriaParams&&filterItems(null,categoriaParams)
   }, [itemsOriginal])
   


   const FilterWord=(itemsFilter:Record<string,string>[],wordFilter:string)=>{
      let arrayInstance:Record<string,string>[] = []; 

      itemsFilter?.map((item:Record<string,string>) => {

         let candado = false;
         let valuesFiltrados=[]

         for (let key of keysFilter) {
            const candado1 = (item[key] as string).toUpperCase().includes(wordFilter.toUpperCase());
            const regex = new RegExp(wordFilter, "gi");

            const value:string= (item[key] as string).replace(
               regex, (originalWord:string) => `<span class="bg-primary text-white">${originalWord}</span>`
            )

            if (candado1) {
               const valueFiltradoInstance={key,value}
               valuesFiltrados.push(valueFiltradoInstance)
               candado = true;
            }
         }
        
         if (candado) {
            const itemFormat={...item}
         
            
         
            for(let obj of valuesFiltrados){
               itemFormat[obj.key]=obj.value
            }
         
            arrayInstance.push(itemFormat);
         }
      });

      return arrayInstance
   }


   const filterCategoria=async(categoriaId:string|number|null)=>{
     
      let arrayInstance=[];
      for (let c of itemsOriginal) {
         //@ts-ignore
         let categoriaBuscada = `${c.categoria}` ;
         let candado2 = (categoriaId || categoriaSelect) == "All" ? true : categoriaBuscada.includes(`${categoriaId || categoriaSelect}`);

         if (candado2) {
            arrayInstance.push(c);
         }
      }
      return arrayInstance
   }

   const filterItems = async(filter:string|null, categoriaId:string|number|null) => {
      const wordFilter = filter //*Palabra que se usara para filtrar 

      let arrayFiltrados:Record<string,string>[] = [];   //*Aqui se almacenaran el resultado final de la busqueda
      let arrayFiltradosCategorias:Record<string,string>[] = [];//* Aqui solo se almacenan los que cumplen con la categoria; en caso existir filtro categoria

      //? ////////////////////////////////////////////////////////////
      
      //* Filtra cada item de la copia origianl para descartar primero los que no cumplan con categoria
      arrayFiltradosCategorias=await filterCategoria(categoriaId) as Record<string,string>[]
     
      //? ////////////////////////////////////////////////////////////

      if (wordFilter) {
         //* Filtra cada item de los resultados del filtro de categoria con la palabra filtrada
        arrayFiltrados= await FilterWord(arrayFiltradosCategorias,wordFilter)
      }

      //? ////////////////////////////////////////////////////////////
   
      switch (true) {
         case  wordFilter &&arrayFiltrados.length === 0:
             return setInstance([]);
           
         case arrayFiltradosCategorias.length == 0:
            return setInstance([]);
           
         case arrayFiltradosCategorias.length>0&&!wordFilter :
            return  setInstance(arrayFiltradosCategorias);
           
         default:
            return  setInstance(arrayFiltrados);
           
      }

   };

   const handleSelectCahnge = (e:any) => {
      const id = e.target.value;
      SetCategoriaSelect(id);
      filterItems( watch("wordFilter"), id);
   };

   const categoriasMemo = useMemo(() => {
      return categorias;
   }, [categorias]);


   useEffect(() => {
     
      if (itemsOriginal.length) {
         setCategoriaSeleccionada&&setCategoriaSeleccionada(categoriaSelect);
         switch (true) {
            case !instance.length:
              
               return setItems([]);
            case instance.length > 0:
             
               return setItems(instance);

            default:
             
               return setItems(itemsOriginal);
         }
      }
   }, [instance]);

   return (
      <form className="w-full  mb-3 flex flex-wrap md:flex-nowrap" >
         <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
         </label>
         <div className={`relative w-full ${categorias&&"md:w-[80%]"}`}>
            <div className="absolute inset-y-0 left-4 flex items-center ps-3 pointer-events-none">
               <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
               </svg>
            </div>

            <input type="search" autoComplete="off" onInput={(e)=>filterItems((e.target as HTMLInputElement).value,null)}  className="outline-none block w-full py-4 pl-12 pr-24 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white "  {...register("wordFilter")} />

            {instance.length > 0 && (
               <button
                  type="button"
                  onClick={() => {
                     setInstance([]);
                     reset({ wordFilter: "" });
                     SetCategoriaSelect("All");
                  }}
                  className="text-white right-3 absolute end-2.5 bottom-2.5 bg-primary font-medium rounded-lg text-sm px-4 py-2 "
               >
                  Quitar Filtro
               </button>
            )}
         </div>

         {
            categorias&&
            
            <select onChange={handleSelectCahnge} id="states" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected={categoriaSelect == "All"} value={"All"}>
                     Todas las categorias
                  </option>
                  {categoriasMemo.map((c:any) => (
                     <option key={c.id} selected={categoriaSelect == c.id} value={c.id}>
                        {c?.nombre_categoria?.toUpperCase()}
                     </option>
                  ))}
            </select>
         }
      </form>
   );
};

export default FilterBar;
