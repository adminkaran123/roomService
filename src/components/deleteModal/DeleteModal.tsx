import {
  Box,
  Button,
  DialogProps,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow:
    "0px 16px 32px -4px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.24)",
  p: 4,
  borderRadius: "8px",
};

interface Props extends DialogProps {
  handleClose: any;
  open: boolean;
  handleConfirm: any;
  title?: string;
  confirmButtonText?: string;
}

export default function DeleteModal(props: Props) {
  const { open, handleClose, handleConfirm, confirmButtonText, title } = props;

  const [inputValue, setInputValue] = useState("");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack justifyContent="center" spacing={2} alignItems="center">
          <Typography variant="h3" component="h3" textAlign={"center"}>
            Sure!
          </Typography>
          <Typography sx={{ mt: 2 }} textAlign={"center"}>
            {title}
          </Typography>

          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              variant="outlined"
              size="large"
              style={{ width: 180, textAlign: "center" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{ width: 180 }}
              onClick={handleConfirm}
            >
              {confirmButtonText}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
