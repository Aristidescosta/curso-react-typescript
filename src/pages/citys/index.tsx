import { useMemo } from "react";

import { useSearchParams } from "react-router-dom";
import { Toolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";

export const ListOfCities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  return (
    <BasePageLayout
      title="Cidades"
      toolbar={
        <Toolbar
          showSearchInput
          newButtonText="Nova"
          searchText={searchParams.get("search") ?? ""}
          whenChangingSearchText={(texto) => setSearchParams({search: texto}, {replace: true})}
        />
      }
    >
      Teste de Cidades
    </BasePageLayout>
  );
};
