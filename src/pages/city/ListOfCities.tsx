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
  Pagination,
  Paper,
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

import {
  ICityListing,
  CityService,
} from "../../shared/services/api/City";
import { BasePageLayout } from "../../shared/layouts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Toolbar } from "../../shared/components";
import { useTheBounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const ListOfCity: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theBounce } = useTheBounce();
  const navigate = useNavigate();
  
  const [rows, setRows] = useState<ICityListing[]>([]);
  const [currentId, setCurrentId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [open, setOpen] = useState(false);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setCurrentId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    CityService.deleteById(id).then((result) => {
      if (result instanceof Error) alert(result.message);
      else {
        setRows((oldRows) => {
          return [...oldRows.filter((row) => row.id !== id)];
        });
      }
    });
    handleClose();
  };

  useEffect(() => {
    setIsLoading(true);
    theBounce(() => {
      CityService.getAll(page, search).then((result) => {
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
  }, [theBounce, search, page]);

  return (
    <BasePageLayout
      title="Cidades"
      toolbar={
        <Toolbar
          showSearchInput
          newButtonText="Nova"
          whenClickNew={() => navigate("/city/details/new")}
          searchText={searchParams.get("search") ?? ""}
          whenChangingSearchText={(texto) =>
            setSearchParams({ search: texto, page: "1" }, { replace: true })
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
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>

          {rows.map((row) => (
            <TableBody key={row.id}>
              <TableRow>
                <TableCell>
                  <IconButton
                    onClick={() => handleClickOpen(row.id)}
                    size="small"
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/city/details/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            </TableBody>
          ))}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Deseja realmente apagar está pessoa?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={() => handleDelete(currentId)} autoFocus>
                Apagar
              </Button>
            </DialogActions>
          </Dialog>

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

            {!isLoading &&
              totalCount > 0 &&
              totalCount > Environment.LIMITE_DE_LINHAS && (
                <>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Pagination
                        variant="outlined"
                        page={page}
                        onChange={(_, newPage) =>
                          setSearchParams(
                            { search, page: newPage.toString() },
                            { replace: true }
                          )
                        }
                        count={Math.ceil(
                          totalCount / Environment.LIMITE_DE_LINHAS
                        )}
                        color="primary"
                      />
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
