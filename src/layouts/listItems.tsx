import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { ListItemStyled } from "./Layout.styles";

export const MainListItems = () => {
  return (
    <div>
      <ListItemStyled component={NavLink} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemStyled>
      <ListItemStyled component={NavLink} to="/form-builder">
        <ListItemIcon>
          <IntegrationInstructionsIcon />
        </ListItemIcon>
        <ListItemText primary="Form Builder" />
      </ListItemStyled>
    </div>
  );
};
