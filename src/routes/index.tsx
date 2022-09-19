import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages";
import { Toolbar } from "../shared/components";
import { useDrawerContext } from "../shared/contexts";
import { BasePageLayout } from "../shared/layouts";

const Teste: React.FC = () => {
  return (
    <BasePageLayout
      title="Cidades"
      toolbar={<Toolbar showSearchInput newButtonText="Novo" showNewButton={false}/>}
    >
      Teste de Cidades
    </BasePageLayout>
  );
};

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
        path: "/city",
        icon: "star",
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/city" element={<Teste />} />
    </Routes>
  );
};
