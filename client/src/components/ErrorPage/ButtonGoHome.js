import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const ButtonGoHome = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      startIcon={<HomeIcon />}
      onClick={() => navigate("/")}
    >
      Go Home
    </Button>
  );
};

export default ButtonGoHome;
