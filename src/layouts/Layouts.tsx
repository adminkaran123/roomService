import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { AccountCircle, ExitToApp, Settings } from "@mui/icons-material"; // Import the icons
import { UserService } from "../services";

import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Container,
  Grid,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Logo from "../assets/header_logo.png";
import { MainListItems } from "./listItems";
import { LayoutContentWithSideBar } from "./Layout.styles";
import useLayout from "./Layout.hooks";

export default function Layout() {
  const {
    isLoggedIn,
    pathname,
    open,
    handleDrawerClose,
    handleDrawerOpen,
    user,
  } = useLayout();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logOutUser } = UserService();

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Replace this function with your actual logout logic
  const handleLogout = () => {
    logOutUser();
    handleMenuClose(); // Close the dropdown menu after logout
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  // if (!user.plan) {
  //   return <Navigate to="/pricing" />;
  // }

  if (pathname.includes("form-builder")) {
    return <Outlet />;
  }
  return (
    <LayoutContentWithSideBar>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx("appBar", open && "appBarShift")}
      >
        <Toolbar className="toolbar">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx("menuButton", open && "menuButtonHidden")}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} width={120} />

          <Avatar
            onClick={handleMenuOpen}
            className="menu_btn"
            sx={{ bgcolor: "red" }}
          >
            {user.email.slice(0, 1)}
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MenuItem onClick={handleLogout} style={{ width: 200 }}>
              <ExitToApp sx={{ marginRight: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx("drawerPaper", !open && "drawerPaperClose"),
        }}
        open={open}
      >
        <div className="toolbarIcon">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ color: "#000" }} />
          </IconButton>
        </div>
        <Divider />

        <MainListItems />
      </Drawer>
      <main className="content">
        <div className="appBarSpacer" />
        <Container maxWidth="lg" className="container">
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Outlet />
            </Grid>
          </Grid>
        </Container>
      </main>
    </LayoutContentWithSideBar>
  );
}
