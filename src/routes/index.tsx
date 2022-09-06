import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
// import { useAppThemeContext } from "../shared/contexts/ThemeContext";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();
  useEffect(() => {
    setDrawerOptions([
      {
        label: "Página Inicial",
        icon: "home",
        path: "/pagina-Inicial",
      },

      {
        label: "Estrela",
        icon: "star",
        path: "/pagina-star",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button
            variant="contained"
            onClick={toggleDrawerOpen}
            color="primary"
          >
            Abrir menu lateral
          </Button>
        }
      />
      {/* <Route path="*" element={<Navigate to="/pagina-inicial" />} /> */}
    </Routes>
  );
};
