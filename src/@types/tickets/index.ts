
interface UserAsignacion{
    nombre:string
    apellidos:string
    foto:string
}


interface Asignaciones{
    vinculacion_usuario:UserAsignacion
    asignador_usuario:UserAsignacion
}

interface Prioridad{
    id:number
    nombre_prioridad:string
    color:string
}

interface Etiqueta{
    id:number
    nombre_etiqueta:string
    color:string
}

export interface TicketData{
  data?:{
    id:string
    prioridad:Prioridad
    fecha_inicio:string
    fecha_fin?:string
    etiqueta:Etiqueta
    asunto:string
    descripcion?:string
    comentarios?:object
    archivos?:object
    asignaciones:Asignaciones[]
  }
}













