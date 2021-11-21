import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const StyledCircularProgress = styled(CircularProgress)({
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  });

export default function Preloader() {
    return <StyledCircularProgress />
}