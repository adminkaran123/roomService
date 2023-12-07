import React, { useEffect, useState } from "react";
import { HubspotService } from "../../../services";

import IconEdit from "../../../assets/icons/icon_edit.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconTrash from "../../../assets/icons/icon_trash.svg";
import IconEmbed from "../../../assets/icons/icon_embed.svg";
import CodeIcon from "@mui/icons-material/Code";
import TextField from "../../../components/textfields/textField/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { copyValuetoClipBoard } from "../../../utils/helpers";

const useStepFormListing = () => {
  const { getStepForms, hubspotRef, deleteStepForm } = HubspotService();

  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const { stepForms } = hubspotRef;
  const navigate = useNavigate();
  const [selectedFormId, setSelectedFormId] = useState("");

  useEffect(() => {
    getStepForms();
  }, []);

  const handleOnAddNewElement = () => {
    navigate("/forms/form-builder");
  };
  const handleOnSearch = (value: string) => {
    setSearch(value);
  };
  const handleOnDeleteConfirmation = () => {
    setShowDeleteConfirmationDialog(true);
  };
  const handleOnEditClick = () => {
    navigate("/form-builder/" + selectedId);
  };
  const handleEmbed = () => {
    setSelectedFormId(selectedId);
  };

  const moreOptions: any[] = [
    {
      optionName: "Edit Form",
      icon: IconEdit,
      onClickAction: handleOnEditClick,
    },
    {
      optionName: "Delete Form",
      icon: IconTrash,
      onClickAction: handleOnDeleteConfirmation,
    },
  ];
  const handleMoreOptionsClick = (id: string) => {
    console.log("id", id);
    setSelectedId(id);
  };

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
            <Button
              onClick={() => {
                copyValuetoClipBoard(params.row._id);
              }}
            >
              <ContentCopyIcon />
            </Button>
          </div>
        );
      },
    },
    {
      field: "embedForm",
      headerName: "Embed Form",
      flex: 2,
      height: 100,

      renderCell: (params: any) => {
        return (
          <div className="copy-text">
            <Button
              onClick={() => {
                setSelectedFormId(params.row._id);
              }}
            >
              <CodeIcon />
            </Button>
          </div>
        );
      },
    },
    { field: "submitCount", headerName: "No of time form submitted" },
    {
      field: "updated_at",
      headerName: "Updated At",
      renderCell: (params: any) => {
        return (
          <div className="date">
            {moment(Number(params.row.updated_at)).format("DD MMM YYYY HH:mm")}
            {}
          </div>
        );
      },
    },
    { field: "action", headerName: "", width: 120, type: "action" },
  ];

  const handleOnCloseConfirmationDialog = () => {
    setShowDeleteConfirmationDialog(false);
  };

  const handleOnDeleteCourse = async () => {
    setShowDeleteConfirmationDialog(false);
    deleteStepForm(selectedId);
  };

  return {
    handleOnAddNewElement,
    handleOnSearch,
    handleMoreOptionsClick,
    moreOptions,
    columns,
    search,
    stepForms,
    handleOnDeleteConfirmation,
    handleOnCloseConfirmationDialog,
    handleOnDeleteCourse,
    showDeleteConfirmationDialog,
    selectedFormId,
    setSelectedFormId,
  };
};

export default useStepFormListing;
