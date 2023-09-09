import { BrowserRouter } from "react-router-dom";

import "./shared/forms/TraductionsYupErrors";

import { DrawerProvider, AppThemeProvider } from "./shared/contexts";
import { SideMenu } from "./shared/components";
import { AppRoutes } from "./routes";

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
