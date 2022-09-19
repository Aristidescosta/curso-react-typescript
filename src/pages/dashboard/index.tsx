import { DetailsTools } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <BasePageLayout
      title="Página inicial"
      // toolbar={<Toolbar showSearchInput newButtonText="Novo" />}
      toolbar={<DetailsTools showSaveAndBackButton/>}
    >
      Testando
    </BasePageLayout>
  );
};
