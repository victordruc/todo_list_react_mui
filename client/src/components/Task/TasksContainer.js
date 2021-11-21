import Sort from "./Sort/Sort"
import Task from "./Task"
import Box from "@mui/material/Box";
import { compose } from "redux";
import withAuthRedirect from "../hoc/withAuthRedirect";
import withTaskPreloader from "../hoc/withTaskPreloader";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import AddTask from "./WorkWithTask/AddTask";

function TasksContainer() {
    const tasks = useSelector(state=>state.taskReducer.task).length
    return (
        <Box sx={{ mt: 2, width: { sm: `calc(100% - ${240}px)` }, marginLeft: { sm: `240px` }}}>
            {tasks?
            <>
                <Sort />
                <Task />
            </>:
            <Box sx={{display:"flex", height:"78vh", justifyContent:"center", alignItems:"center"}}>
                <Typography component="p" variant="h5" color="text.secondary">
                    You don't have the tasks
                </Typography>
            </Box>
            }
            <AddTask />
        </Box>
        )
    
}

export default compose(withAuthRedirect, withTaskPreloader)(TasksContainer)