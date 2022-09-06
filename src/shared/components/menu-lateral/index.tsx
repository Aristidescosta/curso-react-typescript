import React, { ReactNode } from "react";
import { useMediaQuery, Drawer, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon } from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../../contexts"

interface IMenuLateralProps {
  children: ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext(); 

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
							sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              alt="Aritides da Costa"
              src="https://scontent.flad7-1.fna.fbcdn.net/v/t39.30808-1/287191488_728057685184762_1893016277244617234_n.jpg?stp=c0.44.160.160a_dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Fhbe1_tOovEAX_PUAu8&_nc_ht=scontent.flad7-1.fna&oh=00_AT-YzIMjgpvjg3f66G14dcUhaB8VF4VviYF3XhRTOIqQsg&oe=631CB91C"
            />
          </Box>
					<Divider />
					<Box flex={1}>
						<List component="nav">
							<ListItemButton>
								<ListItemIcon>
								<Icon>home</Icon>
								</ListItemIcon>
								<ListItemText primary="Página Inicial"/>
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
