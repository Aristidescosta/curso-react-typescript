import React from "react";
import { Box, Button, TextField, Paper, useTheme, Icon } from "@mui/material";

interface IToolBarProps {
  searchText?: string;
  showInputSearch?: boolean;
  whenChangingSearchText?: (newText: string) => void;
  buttonTextNew?: string;
  showNewTextButton?: boolean;
  whenClickNew?: () => void;
}

export const ToolBar: React.FC<IToolBarProps> = ({
  searchText = "",
  showInputSearch = false,
  whenChangingSearchText,
  buttonTextNew = "Novo",
  showNewTextButton = true,
  whenClickNew,
}) => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      height={theme.spacing(5)}
      display="flex"
      alignItems="center"
    >
      {showInputSearch && (
        <TextField
          size="small"
          placeholder="Pesquisar"
          value={searchText}
          onChange={(e) => whenChangingSearchText?.(e.target.value)}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {showNewTextButton && (
          <Button 
            color="primary"
            disableElevation
            variant="contained"
						onClick={whenClickNew}
            endIcon={<Icon>add</Icon>}
          >
            {buttonTextNew}
          </Button>
        )}
      </Box>
    </Box>
  );
};
