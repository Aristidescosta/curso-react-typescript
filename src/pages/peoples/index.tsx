import { useMemo, useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { Toolbar } from "../../shared/components";
import { useTheBounce } from "../../shared/hooks";
import { BasePageLayout } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/peoples";

export const ListOfPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theBounce } = useTheBounce(3000);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  useEffect(() => {
    theBounce(() => {
      PeopleService.getAll(1, search)
    .then((result) => {
      if(result instanceof Error) {
        alert(result.message)
        return 
      }
      else console.log(result)
    })
    })
  }, [theBounce, search])

  return (
    <BasePageLayout
      title="Pessoas"
      toolbar={
        <Toolbar
          showSearchInput
          newButtonText="Nova"
          searchText={searchParams.get("search") ?? ""}
          whenChangingSearchText={(texto) => setSearchParams({search: texto}, {replace: true})}
        />
      }
    >
      Teste de Pessoas
    </BasePageLayout>
  );
};
