import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function TaskModal({taskTitle,
  tasksName,
  tasksDescription,
  tasksPriority,
  tasksAction,
  tasksActionButton,
  tasksDeadline}) {

  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.taskReducer.isFetching);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("high");
  const [dateValue, setDateValue] = React.useState(new Date());

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDescription(tasksDescription);
    setName(tasksName);
    setPriority(tasksPriority);
    setDateValue(tasksDeadline); 
  };

  React.useEffect(()=>{
    if(!isFetching) {
      handleClose()
     }
  },[isFetching])

  React.useEffect(()=>{
    tasksActionButton.current.onclick = handleClickOpen
    setDescription(tasksDescription);
    setName(tasksName);
    setPriority(tasksPriority);
    setDateValue(tasksDeadline);
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      name,
      description,
      deadline:dateValue,
      priority: priority==="high"?true:false,
      status:false
    }
    dispatch(tasksAction(newTask))
  };

  return (
    <>
      <BootstrapDialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose}>
          {taskTitle}
        </BootstrapDialogTitle>
        <Box component="form" onSubmit={handleSubmit} validate>
          <DialogContent dividers>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              value={name}
              onChange={handleChangeName}
            />

            <TextField
              label="Description"
              margin="normal"
              required
              fullWidth
              multiline
              maxRows={4}
              value={description}
              onChange={handleChangeDescription}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <TextField
                select
                label="Select"
                value={priority}
                onChange={handleChangePriority}
                helperText="Please select priority task"
              >
                <MenuItem value={"high"}>Hight</MenuItem>
                <MenuItem value={"low"}>Low</MenuItem>
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  views={["day"]}
                  minDate={new Date()}
                  inputFormat="dd.MM.yyyy"
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={"Please select date"} />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>

          <DialogActions>
            <LoadingButton
                type="submit"
                color="success"
                loading={isFetching}
                loadingPosition="start"
                variant="outlined"
                startIcon={<SaveIcon />}
              >Save changes</LoadingButton>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  );
}
