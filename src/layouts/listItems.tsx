import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  listItem: {
    color: "#ffffff",
  },
}));

export const MainListItems = () => {
  const classes = useStyles();
  return (
    <div>
      <ListItem component={NavLink} to="/" className={classes.listItem}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        component={NavLink}
        to="/form-builder"
        className={classes.listItem}
      >
        <ListItemIcon>
          <IntegrationInstructionsIcon />
        </ListItemIcon>
        <ListItemText primary="Form Builder" />
      </ListItem>
    </div>
  );
};
