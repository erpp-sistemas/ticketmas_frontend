import { Fraxx, instanceAxios } from "./instanceAxisos";


const {GenerateRoutes}=Fraxx()

export const RoutesEtiquetas=GenerateRoutes({

    EtiquetasArea:"etiquetas/area"

},instanceAxios)




