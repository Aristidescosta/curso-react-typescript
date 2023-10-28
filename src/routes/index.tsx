import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LateralMenu } from "../shared/components/lateral-menu/LateralMenu"

export const AppRoutes = () =>{
    const ROUTER = createBrowserRouter([
        {
            path: "/pagina-inicial",
            element: (
                <LateralMenu />
            ),
            errorElement: (
                <h1>Página não encontrada</h1>
            )
        }
    ])
    return <RouterProvider router={ROUTER} />
}