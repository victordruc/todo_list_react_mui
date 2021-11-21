import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionActions from "@mui/material/AccordionActions";
import Typography from "@mui/material/Typography";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { actionUpdateStatusAsync } from "../../store/task_reducer";
import LoadingButton from "@mui/lab/LoadingButton";
import EditTask from "./WorkWithTask/EditTask";
import DeleteTask from "./WorkWithTask/DeleteTask";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";

const StyleTypography = ({ title, children, ...rest }) => {
  return (
    <Tooltip title={title} placement="bottom-start">
      <Typography {...rest}>{children}</Typography>
    </Tooltip>
  );
};

function Task() {
  const [expanded, setExpanded] = React.useState(false);
  const tasks = useSelector((state) => state.taskReducer.task);
  const isFetching = useSelector((state) => state.taskReducer.isFetching);
  const dispatch = useDispatch();

  const updateStatus = (id) => {
    dispatch(actionUpdateStatusAsync(id));
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const closeDay = (day) => {
    return Math.round((new Date(day) - new Date()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      {tasks.map((task) => (
        <Accordion
          expanded={expanded === task._id}
          onChange={handleChange(task._id)}
          key={task._id}
          sx={{ boxShadow: `0px 0px 4px ${!task.status ? "red" : "green"}` }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="task-content"
            id="task-header"
          >
            <StyleTypography
              title={"Name"}
              sx={{ width: "33%", flexShrink: 0 }}
            >
              {task.name[0].toUpperCase() +
                task.name.substring(1, task.name.length)}
            </StyleTypography>

            <StyleTypography
              title={"Deadline"}
              sx={{ color: "text.secondary" }}
            >
              {!task.status?new Intl.DateTimeFormat("ru").format(new Date(task.deadline)):"close"}
            </StyleTypography>

            {closeDay(task.deadline) < 2 && !task.status && (
              <PriorityHighIcon sx={{ color: red["A700"] }} />
            )}
          </AccordionSummary>

          <AccordionDetails>
            <StyleTypography
              title={"Description"}
              sx={{ wordWrap: "break-word" }}
            >
              {task.description}
            </StyleTypography>

            <Divider textAlign="left" sx={{ my: 2 }}>
              INFO
            </Divider>

            <Grid container>
              <Grid item xs={6}>
              {!task.status && <StyleTypography
                  title={"Close day"}
                  sx={{ color: "text.secondary", p: 1, width: "fit-content" }}
                >
                  To close: {closeDay(task.deadline)} days
                </StyleTypography>}
              </Grid>

              <Grid item xs={3}>
              {!task.status && <StyleTypography
                  title={"Priority"}
                  sx={{
                    color: "text.secondary",
                    p: 1,
                    width: "fit-content",
                    border: `1px solid ${task.priority ? "red" : "green"}`,
                    borderRadius: "5px",
                    boxShadow: `inset 0px 0px 8px ${
                      task.priority ? "red" : "green"
                    }`,
                  }}
                >
                  {task.priority ? "High" : "Low"}
                </StyleTypography>}
              </Grid>

              <Grid item xs={3}>
                <StyleTypography
                  title={"Status"}
                  sx={{
                    color: "text.secondary",
                    p: 1,
                    width: "fit-content",
                    border: `1px solid ${!task.status ? "red" : "green"}`,
                    borderRadius: "5px",
                    boxShadow: `inset 0px 0px 8px ${
                      !task.status ? "red" : "green"
                    }`,
                  }}
                >
                  {task.status ? "Close" : "Open"}
                </StyleTypography>
              </Grid>
            </Grid>
          </AccordionDetails>
          <AccordionActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end" }}
            >
              <EditTask {...task} />

              <DeleteTask id={task._id} name={task.name} />

              {task.status || (
                <LoadingButton
                  onClick={() => {
                    updateStatus(task._id);
                  }}
                  color="success"
                  loading={isFetching}
                  loadingPosition="start"
                  variant="outlined"
                  startIcon={<CheckCircleIcon />}
                >
                  Done
                </LoadingButton>
              )}
            </Stack>
          </AccordionActions>
        </Accordion>
      ))}
      
    </div>
  );
}

export default Task
