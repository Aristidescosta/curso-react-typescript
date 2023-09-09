import axios from "axios";

import { errorInterceptors, responseInterceptors } from "./interceptors";
import { Environment } from "../../../environment";

const Api = axios.create({
    baseURL: Environment.URL_BASE
})

Api.interceptors.response.use(
    (response) => responseInterceptors(response),
    (errors) => errorInterceptors(errors)
)

export { Api }
