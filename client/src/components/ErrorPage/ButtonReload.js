import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

const ButtonReload = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      startIcon={<ReplayIcon />}
      onClick={() => navigate(0)}
    >
      Reload
    </Button>
  );
};

export default ButtonReload;
