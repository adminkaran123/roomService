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
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useNavigate } from "react-router-dom";
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
  title?: string;
  confirmButtonText?: string;
}

export default function UpgradeModal(props: Props) {
  const { open, handleClose, confirmButtonText, title } = props;
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack justifyContent="center" spacing={2} alignItems="center">
          <Stack
            style={{
              width: 100,
              height: 100,
              background: "#ff7a59",
              borderRadius: "50%",
              textAlign: "center",
              padding: 10,
            }}
          >
            <UpgradeIcon style={{ width: 80, height: 80, color: "#fff" }} />
          </Stack>
          <Typography sx={{ mt: 2 }} textAlign={"center"} fontSize={18}>
            {title}
          </Typography>

          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              variant="outlined"
              size="large"
              style={{
                width: 180,
                textAlign: "center",
                borderColor: "#ff7a59",
                color: "#ff7a59",
              }}
              onClick={handleClose}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/pricing");
              }}
              style={{ width: 180, background: "#ff7a59", color: "#fff" }}
            >
              {confirmButtonText?.toLocaleUpperCase()}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
