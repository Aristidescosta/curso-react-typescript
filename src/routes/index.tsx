import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@mui/material";
// import { useAppThemeContext } from "../shared/contexts/ThemeContext";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleDrawerOpen } = useDrawerContext();
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
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
