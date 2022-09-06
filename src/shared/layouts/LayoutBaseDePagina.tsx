import {
  Typography,
  useTheme,
  IconButton,
  Icon,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import { useDrawerContext } from "../contexts"

interface ILayoutBaseDePaginaProps {
  children: ReactNode;
  title: string;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  title,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();
	const { toggleDrawerOpen } = useDrawerContext()

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography variant="h5">{title}</Typography>
      </Box>

      <Box>Barra de feramentas</Box>

      <Box>{children}</Box>
    </Box>
  );
};
