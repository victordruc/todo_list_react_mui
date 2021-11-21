import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from "../Auth/Logout"
import SearchTasks from "../Task/SearchTasks/SearchTasks"
import withAuthRedirect from "../hoc/withAuthRedirect"
import MenuNavbar from "./MenuNavbar"
import { Link } from "react-router-dom";

function Navbar() {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen(mobileOpen => !mobileOpen);
  });
  
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar/>
      <AppBar   sx={{zIndex:"2000"}}>
      
        <Toolbar>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2,display: { sm: 'none' }  }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" to="/" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
              TodoList
            </Link>
          </Typography>

          <SearchTasks />

            <Box sx={{ flexGrow: 60 }} />
          <Logout />
        </Toolbar>

      </AppBar>

      <MenuNavbar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen}/>

    </Box>
    
  );
}

export default withAuthRedirect(Navbar,true)