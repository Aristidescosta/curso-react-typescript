import { Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@mui/material"
import { useAppThemeContext } from "../shared/contexts/ThemeContext";
 
export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant="contained" onClick={toggleTheme} color="primary">Novo teste do Material</Button>} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
