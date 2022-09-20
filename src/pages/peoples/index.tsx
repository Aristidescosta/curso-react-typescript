import { useMemo, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  LinearProgress,
  Paper,
} from "@mui/material";

import {
  IPeopleListing,
  PeopleService,
} from "../../shared/services/api/peoples";
import { BasePageLayout } from "../../shared/layouts";
import { useSearchParams } from "react-router-dom";
import { Toolbar } from "../../shared/components";
import { useTheBounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const ListOfPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theBounce } = useTheBounce();

  const [rows, setRows] = useState<IPeopleListing[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    theBounce(() => {
      PeopleService.getAll(1, search).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result.data);
        setTotalCount(result.totalCount);
        setRows(result.data);
      });
    });
  }, [theBounce, search]);

  return (
    <BasePageLayout
      title="Pessoas"
      toolbar={
        <Toolbar
          showSearchInput
          newButtonText="Nova"
          searchText={searchParams.get("search") ?? ""}
          whenChangingSearchText={(texto) =>
            setSearchParams({ search: texto }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ margin: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          {rows.map((row) => (
            <TableBody key={row.id}>
              <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            </TableBody>
          ))}

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIAS}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BasePageLayout>
  );
};
