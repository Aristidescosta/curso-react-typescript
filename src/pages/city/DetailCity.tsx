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

import { CityService } from "../../shared/services/api/City";
import { DetailsTools } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { VTextFields, VForm, useVForm, IVFormErrors } from "../../shared/forms";

interface IFormData {
  name: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const DetailCity: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm(); 
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();


  const [cityName, setCityName] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");


  const [isLoading, setIsLoading] = useState(false);
  const [msgResult, setMsgResult] = useState<number>(0);

  const handleClose = (result: number) => {
    console.log(result)
    setOpen(false);
    if (isSaveAndClose()) navigate("/city");
    else navigate(`/city/details/${id !== "new" ? id : result}`);
  };


  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);
      CityService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          setTitle(result.message);
          setOpen(true);
        } else {
          setCityName(result.name);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        name: "", 
      });
    }
  }, [id, formRef]);

  const handleSave = (data: IFormData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);

        if (id === "new") {
          CityService.create(validatedData).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
              return;
            } else {
              setOpen(true);
              setTitle("Cidade adicionada com sucesso!");
              setMsgResult(result);
            }
          });
        } else {
          CityService.updateById(Number(id), {
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
              setTitle("Dados da cidade editado com sucesso");
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
    CityService.deleteById(id).then((result) => {
      if (result instanceof Error) alert(result.message);
      else {
        setTitle("Registo apagado com sucesso");
        setOpen(true);
      }
    });
  };

  return (
    <BasePageLayout
      title={id === "new" ? "Nova cidade" : cityName}
      toolbar={
        <DetailsTools
          newButtonText="Nova"
          showSaveAndBackButton
          showNewButton={id !== "new"}
          showDeleteButton={id !== "new"}
          whenClickingOnSaveButton={save}
          whenClickingOnDeleteButton={() => handleDelete(Number(id))}
          whenClickingOnSaveAndBackButton={saveAndClose}
          whenClickingOnBackButton={() => navigate("/city")}
          whenClickingOnNewButton={() => navigate("/city/details/new")}
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
                  name="name"
                  disabled={isLoading}
                  label="Nome"
                  onChange={(e) => setCityName(e.target.value)}
                />
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
