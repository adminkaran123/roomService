import React, { useEffect } from "react";
import { HubspotService } from "../../../services";

import IconEdit from "../../../assets/icons/icon_edit.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconTrash from "../../../assets/icons/icon_trash.svg";
import TextField from "../../../components/textfields/textField/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStepFormListing = () => {
  const [open, setOpen] = React.useState(true);
  const { getStepForms, hubspotRef } = HubspotService();
  const { stepForms } = hubspotRef;
  const navigate = useNavigate();

  useEffect(() => {
    getStepForms();
  }, []);

  const handleOnAddNewElement = () => {
    navigate("/forms/form-builder");
  };
  const handleOnSearch = () => {};
  const handleOnDeleteConfirmation = () => {};

  const moreOptions: any[] = [
    {
      optionName: "Edit Form",
      icon: IconEdit,
      //onClickAction: handleMenuOptionClick,
    },
    {
      optionName: "Delete Form",
      icon: IconTrash,
      onClickAction: handleOnDeleteConfirmation,
    },
  ];
  const handleMoreOptionsClick = () => {};

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "_id",
      headerName: "Form Id",
      flex: 2,
      height: 100,

      renderCell: (params: any) => {
        return (
          <div className="copy-text">
            <input type="text" className="text" value={params.row._id} />
            <Button>
              <ContentCopyIcon />
            </Button>
          </div>
        );
      },
    },
    { field: "action", headerName: "", width: 120, type: "action" },
  ];

  return {
    handleOnAddNewElement,
    handleOnSearch,
    handleMoreOptionsClick,
    moreOptions,
    columns,

    stepForms,
  };
};

export default useStepFormListing;
