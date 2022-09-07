import React from "react";
import { ListingTools, DetailTools } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      title="Página Inicial"
      // toolBar={<ListingTools showInputSearch buttonTextNew="Nova" />}
      toolBar={<DetailTools />}
    >
      Testando o Dashboard
    </LayoutBaseDePagina>
  );
};
