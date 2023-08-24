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
  isEditing: Boolean;
  setIsEditing: Function;
}

const EditableNameComponent: React.FC<EditableNameProps> = ({
  initialName,
  onSave,
  isEditing,
  setIsEditing,
}) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setError(null); // Clear the error when the name changes
  };

  const handleEditClick = (e: any) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Label cannot be blank"); // Set an error message for a blank name
    } else {
      setIsEditing(false);
      onSave(name);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(initialName);
    setError(null); // Clear the error when canceling
  };

  return (
    <div className="slide_name">
      {isEditing ? (
        <div>
          <TextField
            variant="standard"
            value={name}
            onChange={handleNameChange}
            error={!!error}
            helperText={error}
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
