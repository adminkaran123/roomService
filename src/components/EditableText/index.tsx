import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface EditableNameProps {
  initialName: string;
  onSave: (newName: string) => void;
}

const EditableNameComponent: React.FC<EditableNameProps> = ({
  initialName,
  onSave,
}) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(name);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(initialName);
  };

  return (
    <div className="slide_name">
      {isEditing ? (
        <div>
          <TextField
            variant="standard"
            value={name}
            onChange={handleNameChange}
          />
          <IconButton onClick={handleSaveClick} className="save_btn">
            <SaveIcon />
          </IconButton>
          <IconButton onClick={handleCancelClick} className="cancel_btn">
            <CancelIcon />
          </IconButton>
        </div>
      ) : (
        <div>
          <Typography>
            {initialName}
            <IconButton onClick={handleEditClick} className="edit_btn">
              <EditIcon />
            </IconButton>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default EditableNameComponent;
