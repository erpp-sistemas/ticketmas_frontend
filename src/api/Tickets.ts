import { Fraxx, instanceAxios} from "./instanceAxisos";


const {GenerateRoutes}=Fraxx()

const app=GenerateRoutes({

    Tickets:"tickets"

},instanceAxios)


export  default app







