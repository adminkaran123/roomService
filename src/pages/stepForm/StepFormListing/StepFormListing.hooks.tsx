import React, { useEffect, useState } from "react";
import { HubspotService, UiService, UserService } from "../../../services";
import { Typography } from "@mui/material";

import IconEdit from "../../../assets/icons/icon_edit.svg";
import IconDuplicate from "../../../assets/icons/icon_duplicate.svg";
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

  const { uiValue, createAndUpadateTour } = UiService();
  const { userValue } = UserService();
  const { user, tour } = userValue();
  const { isLoading } = uiValue();
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const { stepForms } = hubspotRef;
  const navigate = useNavigate();
  const [selectedFormId, setSelectedFormId] = useState("");

  const steps = [
    {
      selector: ".add-new-button",
      content: (
        <>
          <Typography marginTop="15px">
            Click here to start creating step form
          </Typography>
        </>
      ),
    },
  ];
  const [tourOpen, setTourOpen] = useState(false);
  const closeTour = () => {
    setTourOpen(false);
    let tourData: any[] = [];
    if (tour != null) {
      tourData = [...tour];
    }
    tourData.push("listing-tour");
    createAndUpadateTour(tourData);
  };

  useEffect(() => {
    if (!tour?.includes("listing-tour")) {
      setTourOpen(true);
    }
  }, [tour]);

  useEffect(() => {
    getStepForms();
  }, []);

  const handleOnAddNewElement = () => {
    if (
      user.plan === "monthly" ||
      user.plan === "yearly" ||
      stepForms.length < 2
    ) {
      navigate("/forms/form-builder");
    } else {
      setShowUpgradeDialog(true);
    }
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
  const handleOnCloneClick = () => {
    if (
      user.plan === "monthly" ||
      user.plan === "yearly" ||
      stepForms.length < 2
    ) {
      navigate("/form-builder/" + selectedId + "?clone=true");
    } else {
      setShowUpgradeDialog(true);
    }
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
      optionName: "Clone Form",
      icon: IconDuplicate,
      onClickAction: handleOnCloneClick,
    },
    {
      optionName: "Delete Form",
      icon: IconTrash,
      onClickAction: handleOnDeleteConfirmation,
    },
  ];
  const handleMoreOptionsClick = (id: string) => {
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
    { field: "submissionCount", headerName: "Total Submissions" },
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
    steps,
    closeTour,
    tourOpen,
    showUpgradeDialog,
    setShowUpgradeDialog,
  };
};

export default useStepFormListing;
