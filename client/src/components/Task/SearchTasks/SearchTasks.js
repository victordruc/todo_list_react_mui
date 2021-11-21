import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDispatch } from "react-redux";
import { actionSearchTasksAsync } from "../../../store/task_reducer";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "10px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default function SearchTasks() {
  const [value, setValue] = React.useState("")
  const dispatch = useDispatch()
  const firstMount = React.useRef(false)

  const handleChange = (event) => {
    setValue(event.target.value)
    
  }

  React.useEffect(()=>{
    const timer = setTimeout(()=>{
      if(firstMount.current) {
        dispatch(actionSearchTasksAsync(value))
      } else {
        firstMount.current = true
      }
    },1000)
    return () =>{
      clearTimeout(timer)
    }
  })

  return (
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          value={value}
          onChange={handleChange}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
  );
}
