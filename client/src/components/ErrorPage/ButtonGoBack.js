import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ButtonGoBack = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIosIcon />}
      onClick={() => navigate(-1)}
    >
      Go Back
    </Button>
  );
};

export default ButtonGoBack;
