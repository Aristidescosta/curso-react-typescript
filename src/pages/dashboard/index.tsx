import React from 'react'
import { ToolBar } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina title="Página Inicial" toolBar={(<ToolBar showInputSearch buttonTextNew="Nova"/>)}>
      Testando o Dashboard
    </LayoutBaseDePagina>
  )
}
