import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {actionDeleteTaskAsync} from "../../../store/task_reducer";

export default function DeleteTask({ id, name }) {
  const isFetching = useSelector((state) => state.taskReducer.isFetching);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    if(!isFetching) {
      handleClose()
     }
  },[isFetching])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (id) => {
    dispatch(actionDeleteTaskAsync(id))

  };
  return (
    <>
      <Button
        color="error"
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>You are sure you want to delete this task?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Task: <b>{name}</b> will be deleted!
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            startIcon={<BackspaceIcon />}
          >
            DISAGREE
          </Button>
          <LoadingButton
            onClick={()=>handleSubmit(id)}
            color="error"
            loading={isFetching}
            loadingPosition="start"
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            AGREE
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
