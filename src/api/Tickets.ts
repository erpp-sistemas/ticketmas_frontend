import { Fraxx, instanceAxios} from "./instanceAxisos";


const {GenerateRoutes}=Fraxx()

export const RoutesTickets=GenerateRoutes({

    Tickets:"tickets",
    AsignacionesTickets:"tickets/asignaciones"

},instanceAxios)








