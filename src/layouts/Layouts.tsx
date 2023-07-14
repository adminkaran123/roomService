import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  List,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../redux/slices/userSlice";
import Logo from "../assets/header_logo.png";
import { MainListItems } from "./listItems";
import { LayoutContentWithSideBar } from "./Layout.styles";

export default function Layout() {
  const [open, setOpen] = React.useState(true);
  const userRef = useSelector(userState);
  const { pathname, search } = useLocation();
  const {
    user: { isLoggedIn },
  } = userRef;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

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
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
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
            <ChevronLeftIcon />
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
