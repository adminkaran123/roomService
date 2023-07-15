import React, { useEffect } from "react";
import { HubspotService } from "../services";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { userState } from "../redux/slices/userSlice";

const useLayout = () => {
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

  const { getPortals } = HubspotService();

  useEffect(() => {
    getPortals();
  }, []);

  return {
    handleDrawerOpen,
    handleDrawerClose,
    open,
    isLoggedIn,
    pathname,
  };
};

export default useLayout;
