import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListOfPeople, DetailCity, ListOfCity, DetailPeople } from "../pages";
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
        label: "Pessoas",
        path: "/peoples",
        icon: "people",
      },

      {
        label: "Cidades",
        path: "/city",
        icon: "location_city",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/peoples" element={<ListOfPeople />} />
      <Route path="/people/details/:id" element={<DetailPeople />} />

      <Route path="/city" element={<ListOfCity />} />
      <Route path="/city/details/:id" element={<DetailCity />} />
    </Routes>
  );
};
