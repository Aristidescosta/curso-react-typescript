import { useState, useCallback, useMemo, useContext } from "react"
import { createContext, ReactNode } from "react";
import { ThemeProvider, Box } from "@mui/material";
import { DarkTheme, LightTheme} from "../themes";

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

interface IThemeContextProps {
  children: ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () =>{
	return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<IThemeContextProps> = ({
  children,
}) => {
	const [themeName, setThemeName] = useState<"light" | "dark">("dark")

	const toggleTheme = useCallback(() => {
		setThemeName(oldThemeName => oldThemeName === "light" ? "dark" : "light")
	}, [])

	const theme = useMemo(() => {
		if(themeName === "light")
		return LightTheme
		else
		return DarkTheme 
	}, [themeName])
	
	
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
				<Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
				{children}
				</Box>
			</ThemeProvider>
    </ThemeContext.Provider>
  );
};
