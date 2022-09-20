import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListOfPeople } from "../pages";
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
        icon: "peoplex",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/peoples" element={<ListOfPeople />} />
      <Route path="/people/details/:id" element={<ListOfPeople />} />
    </Routes>
  );
};
