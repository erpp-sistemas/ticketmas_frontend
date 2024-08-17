import { Fraxx, instanceAxios } from "../api/instanceAxisos";



const {GenerateRoutes}=Fraxx()


export const RoutesAreas=GenerateRoutes({
    Areas:"areas"
},instanceAxios)



