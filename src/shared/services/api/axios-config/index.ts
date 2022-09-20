import axios from "axios";

import { Environment } from "../../../environment";
import { errorInterceptors, responseInterceptors } from "./interceptors";

const Api = axios.create({
    baseURL: Environment.URL_BASE
})

Api.interceptors.response.use(
    (response) => responseInterceptors(response),
    (errors) => errorInterceptors(errors)
)

export { Api }
