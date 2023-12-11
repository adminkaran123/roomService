import React, { useEffect, useState } from "react";
import { HubspotService } from "../../../services";

import IconEdit from "../../../assets/icons/icon_edit.svg";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconTrash from "../../../assets/icons/icon_trash.svg";
import CodeIcon from "@mui/icons-material/Code";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { copyValuetoClipBoard } from "../../../utils/helpers";

const useStepFormListing = () => {
  const { getUsers, hubspotRef, deleteSubmisson } = HubspotService();

  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const { users } = hubspotRef;
  const navigate = useNavigate();
  const [selectedFormId, setSelectedFormId] = useState("");

  useEffect(() => {
    getUsers();
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

  const handleEmbed = () => {
    setSelectedFormId(selectedId);
  };

  const moreOptions: any[] = [
    {
      optionName: "Delete Submission",
      icon: IconTrash,
      onClickAction: handleOnDeleteConfirmation,
    },
  ];
  const handleMoreOptionsClick = (id: string) => {
    console.log("id", id);
    setSelectedId(id);
  };

  const columns = [
    {
      field: "username",
      headerName: "Username",
    },

    { field: "email", headerName: "Email" },
    { field: "plan", headerName: "Plan" },
    {
      field: "hasTrial",
      headerName: "On Trial",
      renderCell: (params: any) => {
        return <div className="date">{params.row.hasTrial ? "Yes" : "No"}</div>;
      },
    },
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
  ];

  const handleOnCloseConfirmationDialog = () => {
    setShowDeleteConfirmationDialog(false);
  };

  const handleOnDeleteCourse = async () => {
    setShowDeleteConfirmationDialog(false);
    deleteSubmisson(selectedId);
  };

  return {
    handleOnSearch,
    moreOptions,
    handleMoreOptionsClick,
    columns,
    search,
    users,
    handleOnCloseConfirmationDialog,
    handleOnDeleteCourse,
    showDeleteConfirmationDialog,
    selectedFormId,
    setSelectedFormId,
  };
};

export default useStepFormListing;
