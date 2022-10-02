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
import { useEffect, useState, useRef } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import { PeopleService } from "../../shared/services/api/peoples";
import { DetailsTools } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { VTextFields } from "../../forms";

interface IFormData {
  fullName: string;
  email: string;
  cityId: string;
}

export const DetailPeople: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const [open, setOpen] = useState(false);
  const [peopleName, setPeopleName] = useState("");
  const [title, setTitle] = useState("");

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/peoples");
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
    }
  }, [id]);

  const handleSave = async (dados: IFormData) => {
    setIsLoading(true);
    if (id === "new") {
      await PeopleService.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          alert("Pessoa adicionada com sucesso!");
          navigate(`/people/details/${result}`);
        }
      });
    } else {
      await PeopleService.updateById(Number(id), {
        id: Number(id),
        ...dados,
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
          whenClickingOnSaveButton={() => formRef.current?.submitForm()}
          whenClickingOnDeleteButton={() => handleDelete(Number(id))}
          whenClickingOnSaveAndBackButton={() => formRef.current?.submitForm()}
          whenClickingOnBackButton={() => navigate("/peoples")}
          whenClickingOnNewButton={() => navigate("/people/details/new")}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
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
                  onChange={e => setPeopleName(e.target.value)}
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
                <VTextFields
                  fullWidth
                  name="cityId"
                  disabled={isLoading}
                  label="Cidade"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </BasePageLayout>
  );
};
