import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsTools } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  LinearProgress,
} from "@mui/material";
import { PeopleService } from "../../shared/services/api/peoples";

export const DetailPeople: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [peopleName, setPeopleName] = useState("");
  const [title, setTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/peoples");
  };

  useEffect(() => {
    console.log("teste");
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
        }
      });
    }
  }, [id]);

  const handleSave = () => {};

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
          whenClickingOnSaveButton={handleSave}
          whenClickingOnDeleteButton={() => handleDelete(Number(id))}
          whenClickingOnSaveAndBackButton={handleSave}
          whenClickingOnBackButton={() => navigate("/peoples")}
          whenClickingOnNewButton={() => navigate("/people/details/new")}
        />
      }
    >
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
      {isLoading && <LinearProgress variant="indeterminate" />}
    </BasePageLayout>
  );
};
