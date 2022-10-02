import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsTools } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import {
  IPersonDetail,
  PeopleService,
} from "../../shared/services/api/peoples";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
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
          setOpen(true)
          setTitle(result.message)
          return;
        }
        else{
          setOpen(true)
          setTitle("Dados da pessoa editado com sucesso")
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
        <VTextFields name="fullName" />
        <VTextFields name="email" />
        <VTextFields name="cityId" />
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
