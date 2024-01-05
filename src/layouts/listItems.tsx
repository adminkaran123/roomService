import { ListItemIcon, ListItemText } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import PollIcon from "@mui/icons-material/Poll";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";

import { ListItemStyled } from "./Layout.styles";
interface MainListItemsProps {
  isAdmin: boolean;
}

export const MainListItems = (props: MainListItemsProps) => {
  const { isAdmin } = props;
  return (
    <div>
      <ListItemStyled to="/dashboard" className="dashboard">
        <ListItemIcon className="icon">
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemStyled>

      <ListItemStyled to="/account" className="update-profile">
        <ListItemIcon className="icon">
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItemStyled>
      {!isAdmin && (
        <ListItemStyled to="/forms" className="step-form">
          <ListItemIcon className="icon">
            <IntegrationInstructionsIcon />
          </ListItemIcon>
          <ListItemText primary="Step Form" />
        </ListItemStyled>
      )}
      {!isAdmin && (
        <ListItemStyled to="/submissons" className="submissons">
          <ListItemIcon className="icon">
            <WysiwygIcon />
          </ListItemIcon>
          <ListItemText primary="Form Submissons" />
        </ListItemStyled>
      )}
      {/* <ListItemStyled to="/form-builder">
        <ListItemIcon className="icon">
          <PollIcon />
        </ListItemIcon>
        <ListItemText primary="Polls" />
      {/* <ListItemStyled to="/form-builder">
        <ListItemIcon className="icon">
          <PollIcon />
        </ListItemIcon>
        <ListItemText primary="Polls" />
      </ListItemStyled> */}
    </div>
  );
};
