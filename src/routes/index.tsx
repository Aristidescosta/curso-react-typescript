import { createBrowserRouter, RouterProvider } from "react-router-dom"

export const AppRoutes = () =>{
    const ROUTER = createBrowserRouter([
        {
            path: "/pagina-inicial",
            element: (
                <h1>Olá mundo! Elemento principal</h1>
            ),
            errorElement: (
                <h1>Página não encontrada</h1>
            )
        }
    ])
    return <RouterProvider router={ROUTER} />
}