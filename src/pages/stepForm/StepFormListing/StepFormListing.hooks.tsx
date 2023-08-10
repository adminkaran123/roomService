import React, { useEffect } from "react";
import { HubspotService } from "../services";
import { useLocation } from "react-router";
import IconEdit from "../../../assets/icons/icon_edit.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconTrash from "../../../assets/icons/icon_trash.svg";
import TextField from "../../../components/textfields/textField/TextField";

const useStepFormListing = () => {
  const [open, setOpen] = React.useState(true);

  const handleOnAddNewElement = () => {};
  const handleOnSearch = () => {};
  const handleOnDeleteConfirmation = () => {};

  const moreOptions: any[] = [
    {
      optionName: "Edit Template",
      icon: IconEdit,
      //onClickAction: handleMenuOptionClick,
    },
    {
      optionName: "Delete Template",
      icon: IconTrash,
      onClickAction: handleOnDeleteConfirmation,
    },
  ];
  const handleMoreOptionsClick = () => {};

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "id",
      headerName: "Form Id",
      flex: 2,
      height: 100,

      renderCell: (params: any) => {
        return (
          <div className="copy-text">
            <input type="text" className="text" value={params.row.name} />
            <button>
              <ContentCopyIcon />
            </button>
          </div>
        );
      },
    },
    { field: "action", headerName: "", width: 120, type: "action" },
  ];

  const rows = [
    { id: "1", name: "John Doe", email: "john@example.com", age: 25 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", age: 30 },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", age: 28 },
  ];

  return {
    handleOnAddNewElement,
    handleOnSearch,
    handleMoreOptionsClick,
    moreOptions,
    columns,
    rows,
  };
};

export default useStepFormListing;
