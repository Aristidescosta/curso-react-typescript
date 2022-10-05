import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";

import { PeopleService } from "../../shared/services/api/Peoples";
import { DetailsTools } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { VTextFields, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { AutocompleteCity } from "./components/AutocompletePeoples";

interface IFormData {
  fullName: string;
  email: string;
  cityId: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  cityId: yup.number().required(),
  email: yup.string().required().email(),
  fullName: yup.string().required().min(3),
});

export const DetailPeople: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const [open, setOpen] = useState(false);
  const [peopleName, setPeopleName] = useState("");
  const [title, setTitle] = useState("");

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  let msgResult: number = 0;

  const handleClose = (result: number) => {
    setOpen(false);
    if (isSaveAndClose()) navigate("/peoples");
    else navigate(`/people/details/${id !== "new" ? id : result}`);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);
      PeopleService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          setTitle(result.message);
          setOpen(true);
        } else {
          setPeopleName(result.fullName);
          console.log(result);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        email: "",
        fullName: "",
        cityId: "",
      });
    }
  }, [id, formRef]);

  const handleSave = (data: IFormData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);

        if (id === "new") {
          PeopleService.create(validatedData).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
              return;
            } else {
              setOpen(true);
              setTitle("Pessoa adicionada com sucesso!");
              msgResult = result;
            }
          });
        } else {
          PeopleService.updateById(Number(id), {
            id: Number(id),
            ...validatedData,
          }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              setOpen(true);
              setTitle(result.message);
              return;
            } else {
              setOpen(true);
              setTitle("Dados da pessoa editado com sucesso");
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationError: IVFormErrors = {};

        errors.inner.forEach(error => {
          if(!error.path) return;

          validationError[error.path] = error.message;
        })
        console.log(validationError);
        formRef.current?.setErrors(validationError)
      });
  };

  const handleDelete = (id: number) => {
    PeopleService.deleteById(id).then((result) => {
      if (result instanceof Error) alert(result.message);
      else {
        setTitle("Registo apagado com sucesso");
        setOpen(true);
      }
    });
  };

  return (
    <BasePageLayout
      title={id === "new" ? "Nova pessoa" : peopleName}
      toolbar={
        <DetailsTools
          newButtonText="Nova"
          showSaveAndBackButton
          showNewButton={id !== "new"}
          showDeleteButton={id !== "new"}
          whenClickingOnSaveButton={save}
          whenClickingOnDeleteButton={() => handleDelete(Number(id))}
          whenClickingOnSaveAndBackButton={saveAndClose}
          whenClickingOnBackButton={() => navigate("/peoples")}
          whenClickingOnNewButton={() => navigate("/people/details/new")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h5">Geral</Typography>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextFields
                  fullWidth
                  name="fullName"
                  disabled={isLoading}
                  label="Nome completo"
                  onChange={(e) => setPeopleName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextFields
                  fullWidth
                  name="email"
                  disabled={isLoading}
                  label="Email"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <AutocompleteCity isExternalLoading={isLoading}/>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose(msgResult)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </BasePageLayout>
  );
};
