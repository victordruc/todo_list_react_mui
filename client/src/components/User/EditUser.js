import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import {
  actionChangePasswordAsync,
  actionDeleteUserAsync,
} from "../../store/user_reducer";
import LoadingButton from "@mui/lab/LoadingButton";
import { blue } from '@mui/material/colors';
import withAuthRedirect from "../hoc/withAuthRedirect"

function EditUser({ pass }) {
  const dispatch = useDispatch();

  const {email} = useSelector((state) => state.userReducer.user);
  const isFetching = useSelector((state) => state.userReducer.isFetching);
  const errorUser = useSelector((state) => state.userReducer.errorUser);
  const errorPassword = useSelector((state) => state.userReducer.errorPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (pass) {
      dispatch(actionChangePasswordAsync(data.get("password"), data.get("repeatPassword")));
    } else {
      dispatch(
        actionDeleteUserAsync(data.get("email"),data.get("password"))
      );
    }
  };

  return (
      <Container component="main" maxWidth="md" sx={{marginLeft: { sm: `300px` }}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
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
            USER: {email}
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {pass ? "Change Password" : "Delete User"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >

            {!pass && <TextField
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
            />}

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
   
            {pass && <TextField
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
            />}
            

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isFetching}
              loadingPosition="start"
            >
              {pass ? "Change Password" : "Delete User"}
            </LoadingButton>
          </Box>
        </Box>
      </Container>
  );
}

export default withAuthRedirect(EditUser)
