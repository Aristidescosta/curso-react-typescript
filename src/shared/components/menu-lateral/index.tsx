import React, { ReactNode } from "react";
import {
  useMediaQuery,
  Drawer,
  useTheme,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IMenuLateralProps {
  children: ReactNode;
}

interface IListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  icon,
  label,
  to,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              alt="Aritides da Costa"
              src="https://scontent.flad7-1.fna.fbcdn.net/v/t39.30808-1/287191488_728057685184762_1893016277244617234_n.jpg?stp=c0.44.160.160a_dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Fhbe1_tOovEAX_PUAu8&_nc_ht=scontent.flad7-1.fna&oh=00_AT-YzIMjgpvjg3f66G14dcUhaB8VF4VviYF3XhRTOIqQsg&oe=631CB91C"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton  onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
