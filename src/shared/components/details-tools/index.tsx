import {
  Box,
  Paper,
  useTheme,
  Button,
  Icon,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ReactNode } from "react";

interface IDetailsToolsProps {
  children?: ReactNode;
  newButtonText?: string;
  showNewButton?: boolean;
  showDeleteButton?: boolean;
  showBackButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndBackButton?: boolean;

  showNewButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showSaveAndBackButtonLoading?: boolean;

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

  showNewButtonLoading = false,
  showDeleteButtonLoading = false,
  showBackButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndBackButtonLoading = false,

  whenClickingOnNewButton,
  whenClickingOnDeleteButton,
  whenClickingOnBackButton,
  whenClickingOnSaveButton,
  whenClickingOnSaveAndBackButton,
}) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
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
      {showSaveButton && !showSaveButtonLoading && !mdDown && (
        <Button
          variant="contained"
          onClick={whenClickingOnSaveButton}
          disableElevation
          color="primary"
          startIcon={<Icon>save</Icon>}
        >
          <Typography noWrap variant="button">
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && !mdDown && <Skeleton width={110} height={60} />}

      {showSaveAndBackButton && !showSaveAndBackButtonLoading && !mdDown && (
        <Button
          variant="outlined"
          onClick={whenClickingOnSaveAndBackButton}
          disableElevation
          color="primary"
          startIcon={<Icon>save</Icon>}
        >
          <Typography noWrap variant="button">
            Salvar e voltar
          </Typography>
        </Button>
      )}

      {showSaveAndBackButtonLoading && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          variant="outlined"
          onClick={whenClickingOnDeleteButton}
          disableElevation
          color="primary"
          startIcon={<Icon>delete</Icon>}
        >
          <Typography noWrap variant="button">
            Apagar
          </Typography>
        </Button>
      )}

      {showDeleteButtonLoading && <Skeleton width={110} height={60} />}

      {showNewButton && !showNewButtonLoading && (
        <Button
          variant="outlined"
          onClick={whenClickingOnNewButton}
          disableElevation
          color="primary"
          startIcon={<Icon>add</Icon>}
        >
          <Typography noWrap variant="button">
            {newButtonText}
          </Typography>
        </Button>
      )}

      {showNewButtonLoading && <Skeleton width={110} height={60} />}

      {showBackButton && !showBackButtonLoading && (
        <>
          <Divider variant="middle" orientation="vertical" />

          <Button
            variant="outlined"
            onClick={whenClickingOnBackButton}
            disableElevation
            color="primary"
            startIcon={<Icon>arrow_back</Icon>}
          >
            <Typography noWrap variant="button">
              Voltar
            </Typography>
          </Button>
        </>
      )}

      {showBackButtonLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};
