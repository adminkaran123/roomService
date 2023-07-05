import * as React from "react";

import { ModalBox } from "./CustomModal.styles";
import { Modal, DialogProps, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props extends DialogProps {
  handleClose: any;
  open: boolean;
}

export default function CustomModal(props: Props) {
  const { handleClose, open, children } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <IconButton className="close_btn" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        {children}
      </ModalBox>
    </Modal>
  );
}
