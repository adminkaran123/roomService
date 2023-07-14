import { ListItemIcon, ListItemText } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { ListItemStyled } from "./Layout.styles";

export const MainListItems = () => {
  return (
    <div>
      <ListItemStyled to="/dashbaord">
        <ListItemIcon className="icon">
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemStyled>
      <ListItemStyled to="/form-builder">
        <ListItemIcon className="icon">
          <IntegrationInstructionsIcon />
        </ListItemIcon>
        <ListItemText primary="Form Builder" />
      </ListItemStyled>
    </div>
  );
};
