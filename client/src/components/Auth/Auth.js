import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import {
  actionLoginUserAsync,
  actionRegisterUserAsync,
} from "../../store/user_reducer";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { blue } from '@mui/material/colors';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Todo List
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Auth({ sign }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const isFetching = useSelector((state) => state.userReducer.isFetching);
  const errorUser = useSelector((state) => state.userReducer.errorUser);
  const errorPassword = useSelector((state) => state.userReducer.errorPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (sign) {
      dispatch(actionLoginUserAsync(data.get("email"), data.get("password")));
    } else {
      dispatch(
        actionRegisterUserAsync(data.get("email"), data.get("password"), data.get("repeatPassword"))
      );
    }
  };

  React.useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth,navigate]);

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 1,
            borderColor: blue[800],
            borderRadius: 4,
            p:2,
            boxShadow: 3
          }}
        >
          <Typography color={blue[800]} component="h1" variant="h5">
            TODO LIST
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {sign ? "Sign in" : "Sign up"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              error={errorUser}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errorUser}
            />
            <TextField
              margin="normal"
              error={errorPassword}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errorPassword}
            />
            {sign || 
            <TextField
              margin="normal"
              error={errorPassword}
              required
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              id="repeatPassword"
              autoComplete="repeat-password"
              helperText={errorPassword}
            />
            }
            

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isFetching}
              loadingPosition="start"
            >
              {sign ? "Sign in" : "Sign up"}
            </LoadingButton>
            <Box sx={{ textAlign: "center" }}>
              <Link
                to={sign ? "/signup" : "/signin"}
                component={RouterLink}
                variant="body2"
              >
                {sign
                  ? "Don't have an account? Sign Up"
                  : "You already have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

export default Auth
