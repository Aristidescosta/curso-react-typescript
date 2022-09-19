import { Box, Paper, useTheme, Button, Icon, Divider } from "@mui/material";
import { ReactNode } from "react";

interface IDetailsToolsProps {
  children?: ReactNode;
  newButtonText?: string;
  showNewButton?: boolean;
  showDeleteButton?: boolean;
  showBackButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  whenClickingOnNewButton?: () => void;
  whenClickingOnDeleteButton?: () => void;
  whenClickingOnBackButton?: () => void;
  whenClickingOnSaveButton?: () => void;
  whenClickingOnSaveAndBackButton?: () => void;
}

export const DetailsTools: React.FC<IDetailsToolsProps> = ({
  newButtonText = "Novo",

  showNewButton = true,
  showDeleteButton = true,
  showBackButton = true,
  showSaveButton = true,
  showSaveAndBackButton = false,

  whenClickingOnNewButton,
  whenClickingOnDeleteButton,
  whenClickingOnBackButton,
  whenClickingOnSaveButton,
  whenClickingOnSaveAndBackButton,
}) => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
    >
      {showSaveButton && (
        <Button
          variant="contained"
          onClick={whenClickingOnSaveButton}
          disableElevation
          color="primary"
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}

      {showSaveAndBackButton && (
        <Button
          variant="outlined"
          onClick={whenClickingOnSaveAndBackButton}
          disableElevation
          color="primary"
          startIcon={<Icon>save</Icon>}
        >
          Salvar e voltar
        </Button>
      )}

      {showDeleteButton && (
        <Button
          variant="outlined"
          onClick={whenClickingOnDeleteButton}
          disableElevation
          color="primary"
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}

      {showNewButton && (
        <Button
          variant="outlined"
          onClick={whenClickingOnNewButton}
          disableElevation
          color="primary"
          startIcon={<Icon>add</Icon>}
        >
          {newButtonText}
        </Button>
      )}

      {showBackButton && (
        <>
          <Divider variant="middle" orientation="vertical" />

          <Button
            variant="outlined"
            onClick={whenClickingOnBackButton}
            disableElevation
            color="primary"
            startIcon={<Icon>arrow_back</Icon>}
          >
            Voltar
          </Button>
        </>
      )}
    </Box>
  );
};
