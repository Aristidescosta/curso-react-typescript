import axios from "axios";
import { errorInterceptors, responseInterceptors } from "./interceptors";

const Api = axios.create({
    baseURL: "http://localhost:3001/"
})

Api.interceptors.response.use(
    (response) => responseInterceptors(response),
    (errors) => errorInterceptors(errors)
)

export { Api }
