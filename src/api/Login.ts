import { Fraxx, instanceAxios } from "./instanceAxisos";

const {GenerateRoutes}=Fraxx()

const RoutesAuth=GenerateRoutes(
    {
        login:"auth/login"
    },instanceAxios
)


export default RoutesAuth


