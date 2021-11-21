import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const ErrorPage = ({text, error, children}) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "74vh",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item sm={7} md={4}>
            <Typography variant="h3" component="h1">
              {error}
            </Typography>
          </Grid>
          <Grid item sm={5} md={8}>
            <Typography variant="h5" component="h2" gutterBottom>
              {text}
            </Typography>
            <Grid item>
              <Stack direction="row" spacing={2}>
                {children}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ErrorPage;
