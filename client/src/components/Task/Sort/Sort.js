import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from "react-redux";
import { actionSortTasksAsync } from "../../../store/task_reducer";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Sort() {
  const [sort, setSort] = React.useState('');
  const dispatch = useDispatch()
  const handleChange = (event) => {
    setSort(event.target.value);
    dispatch(actionSortTasksAsync(event.target.value))
  };

  return (
    <Box sx={{ minWidth: 120, mb: 2}}>
      <FormControl fullWidth>
        <InputLabel>Sort</InputLabel>
        <Select
          value={sort}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={"name-asc"}>Name <ArrowUpwardIcon/></MenuItem>
          <MenuItem value={"name-desc"}>Name <ArrowDownwardIcon/></MenuItem>
          <MenuItem value={"status-asc"}>Status <ArrowUpwardIcon/></MenuItem>
          <MenuItem value={"status-desc"}>Status <ArrowDownwardIcon/></MenuItem>
          <MenuItem value={"deadline-asc"}>Deadline <ArrowUpwardIcon/></MenuItem>
          <MenuItem value={"deadline-desc"}>Deadline <ArrowDownwardIcon/></MenuItem>
          <MenuItem value={"priority-asc"}>Priority <ArrowUpwardIcon/></MenuItem>
          <MenuItem value={"priority-desc"}>Priority <ArrowDownwardIcon/></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}