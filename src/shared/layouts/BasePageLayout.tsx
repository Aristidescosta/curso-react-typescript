import { Box } from "@mui/system";
import { ReactNode } from "react";

import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useDrawerContext } from "../contexts";

interface IBasePageLayoutProps {
  children: ReactNode;
  title: string;
  toolbar?: ReactNode;
}

export const BasePageLayout: React.FC<IBasePageLayoutProps> = ({
  children,
  title,
  toolbar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Box height="100%" display="flex" flexDirection="column" gap={1}>
        <Box
          padding={1}
          height={smDown ? theme.spacing(6) : mdDown ? theme.spacing(8) : theme.spacing(12)}
          display="flex"
          alignItems="center"
          gap={1}
        >
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>
          )}
          <Typography
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipses"
            variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          >
            {title}
          </Typography>
        </Box>

        {toolbar && <Box>{toolbar}</Box>}

        <Box flex={1} overflow="auto">
          {children}
        </Box>
      </Box>
    </>
  );
};
