import * as React from "react";

import { ModalBox } from "./CustomModal.styles";
import { Modal, DialogProps, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props extends DialogProps {
  handleClose: any;
  open: boolean;
  width?: string;
}

export default function CustomModal(props: Props) {
  const { handleClose, open, children, width = "600px" } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox style={{ width: width }}>
        <IconButton className="close_btn" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        {children}
      </ModalBox>
    </Modal>
  );
}
