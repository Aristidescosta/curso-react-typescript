import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { CityService, PeopleService } from "../../shared/services/api";
import { BasePageLayout } from "../../shared/layouts";
import { Toolbar } from "../../shared/components";

export const Dashboard = () => {
  const [isLoadingCity, setIsLoadingCity] = useState(true);
  const [isLoadingPeople, setIsLoadingPeople] = useState(true);
  const [totalCountCity, setTotalCountCity] = useState(0);
  const [totalCountPeople, setTotalCountPeople] = useState(0);
  useEffect(() => {
    setIsLoadingCity(true);
    setIsLoadingPeople(true);

    CityService.getAll(1).then((result) => {
      setIsLoadingCity(false);
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
      setTotalCountCity(result.totalCount);
    });

    PeopleService.getAll(1).then((result) => {
      setIsLoadingCity(false);
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
      setTotalCountPeople(result.totalCount);
    });
  }, []);
  return (
    <BasePageLayout
      title="Página inicial"
      toolbar={<Toolbar showNewButton={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Pessoas
                  </Typography>
                  <Box
                    padding={6}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    {!isLoadingPeople && (
                      <Typography variant="h1">{totalCountPeople}</Typography>
                    )}
                    {isLoadingPeople && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de Cidades
                  </Typography>
                  <Box
                    padding={6}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    {!isLoadingCity && (
                      <Typography variant="h1">{totalCountCity}</Typography>
                    )}
                    {isLoadingCity && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BasePageLayout>
  );
};
