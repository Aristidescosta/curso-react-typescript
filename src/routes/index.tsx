import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListOfCities } from "../pages";
import { useDrawerContext } from "../shared/contexts";


export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  useEffect(() => {
    setDrawerOptions([
      {
        label: "Página Inicial",
        path: "/pagina-inicial",
        icon: "home",
      },

      {
        label: "Cidades",
        path: "/cities",
        icon: "location_city",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/cities" element={<ListOfCities />} />
      <Route path="/cities/details/:id" element={<ListOfCities />} />
    </Routes>
  );
};
