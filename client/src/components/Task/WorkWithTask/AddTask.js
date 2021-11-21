import * as React from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {actionAddTaskAsync} from "../../../store/task_reducer";
import TaskModal from "./TaskModal"

const StyledFab = styled(Fab)({
  position: "fixed",
  zIndex: 1,
  bottom: 20,
  right: 20,
  margin: "0 auto",
});

function AddTask() {
    const ref = React.useRef()
  return (
    <div>
      <StyledFab ref={ref} color="primary">
        <AddIcon />
      </StyledFab>
        <TaskModal
            taskTitle = "ADD NEW TASK"
            tasksName = ""
            tasksDescription = ""
            tasksPriority = "high"
            tasksAction = {actionAddTaskAsync}
            tasksActionButton={ref}
            tasksDeadline = {new Date()}
        />
    </div>
  );
}

export default AddTask
