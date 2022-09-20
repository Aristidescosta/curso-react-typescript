import {
  TextField,
  Button,
  Paper,
  useTheme,
  Icon,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import { Environment } from "../../environment";

interface IToolbarProps {
  searchText?: string;
  showSearchInput?: boolean;
  whenChangingSearchText?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  whenClickNew?: () => void;
}

export const Toolbar: React.FC<IToolbarProps> = ({
  searchText = "",
  showSearchInput = false,
  whenChangingSearchText,
  newButtonText = "Novo",
  showNewButton = true,
  whenClickNew,
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
      alignItems="center"
    >
      {showSearchInput && (
        <TextField
          size="small"
          value={searchText}
          onChange={(e) => whenChangingSearchText?.(e.target.value)}
          placeholder={Environment.INPUT_DE_BUSCA}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={whenClickNew}
            endIcon={<Icon>add</Icon>}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
