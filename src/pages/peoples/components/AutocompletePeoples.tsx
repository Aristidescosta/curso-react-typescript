import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useField } from "@unform/core";

import { CityService } from "../../../shared/services/api/City";
import { useTheBounce } from "../../../shared/hooks";

type TAutocompleteCityOption = {
  id: number;
  label: string;
};

interface IAutocompleteCityProps {
  isExternalLoading?: boolean;
}

export const AutocompleteCity: React.FC<IAutocompleteCityProps> = ({
  isExternalLoading = false,
}) => {
  const { theBounce } = useTheBounce();
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("cityId");

  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  );
  const [options, setOptions] = useState<TAutocompleteCityOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    theBounce(() => {
      CityService.getAll(1, search).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          // alert(result.message);
          return;
        } else {
          setOptions(
            result.data.map((city) => ({ id: city.id, label: city.name }))
          );
        }
      });
    });
  }, [theBounce, search]);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, selectedId, fieldName]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find((option) => option.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      value={autoCompleteSelectedOption}
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando"
      disablePortal
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setSearch("");
        clearError();
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidades"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
