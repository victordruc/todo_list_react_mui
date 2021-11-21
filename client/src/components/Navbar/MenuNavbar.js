import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';

function MenuNavbar({handleDrawerToggle, mobileOpen}) {
  const {email} = useSelector(state=>state.userReducer.user)
  const drawerWidth = 240;
  const drawer = (
    <div>
      <Toolbar/>
      <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={`User : ${email}`} />
          </ListItem>
          <Divider />

          <ListItem button component={Link} to="/change-password">
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>

          <ListItem button component={Link} to="/delete-user">
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete User" />
          </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default MenuNavbar
