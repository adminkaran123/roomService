import { Outlet, Navigate } from "react-router-dom";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
    portals,
  } = useLayout();
  console.log("userdasdasd", user);

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
          <FormControl className="portals">
            <Select
              value={user.portal_id}

              //onChange={handleChange}
            >
              {portals?.map((portal: any) => {
                return (
                  <MenuItem key={portal.portal_id} value={portal.portal_id}>
                    {portal.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
