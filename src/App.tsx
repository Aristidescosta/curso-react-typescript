import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { SideMenu } from "./shared/components";
import { DrawerProvider, AppThemeProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <SideMenu>
            <AppRoutes />
          </SideMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
