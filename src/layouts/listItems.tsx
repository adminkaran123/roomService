import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <IntegrationInstructionsIcon />
      </ListItemIcon>
      <ListItemText primary="Form Builder" />
    </ListItem>
  </div>
);
