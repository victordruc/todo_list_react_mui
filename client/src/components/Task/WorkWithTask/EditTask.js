import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {actionUpdateTaskAsync} from "../../../store/task_reducer";
import TaskModal from "./TaskModal";
import Button from "@mui/material/Button";

function EditTask({_id,name,description,priority,deadline}) {
    const ref = React.useRef()
    const actionUpdateTask = (id) => (body) => actionUpdateTaskAsync(id,body)
  return (
    <div>
      <Button ref={ref} variant="outlined" startIcon={<EditIcon />}>
                Edit
      </Button>
        <TaskModal
            taskTitle = "EDIT TASK"
            tasksName = {name}
            tasksDescription = {description}
            tasksPriority = {priority?"high":"low"}
            tasksAction = {actionUpdateTask(_id)}
            tasksActionButton={ref}
            tasksDeadline = {deadline}
        />
    </div>
  );
}

export default EditTask
