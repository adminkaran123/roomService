import React, { useState, useEffect } from "react";
import { HubspotService, UiService, UserService } from "../../../services";
import { arrayMoveImmutable } from "array-move";
import { useParams } from "react-router";
import { Typography } from "@mui/material";

import IconEdit from "../../../assets/icons/icon_edit.svg";
import IconTrash from "../../../assets/icons/icon_trash.svg";
import { set } from "react-hook-form";
const sidebarSteps = [
  {
    selector: ".name_input",
    content: (
      <>
        <Typography marginTop="15px">
          Give your form a name. This will be used to identify your form in the
          list of forms.
        </Typography>
      </>
    ),
  },
  {
    selector: ".slide-btn",
    content: (
      <>
        <Typography marginTop="15px">
          Add, delete, and rearrange slides of your step form
        </Typography>
      </>
    ),
  },
  {
    selector: ".elemnet-btn",
    content: (
      <>
        <Typography marginTop="15px">
          To start creating a form, drag a layout from here. You can also find
          rich text and image modules here.
        </Typography>
      </>
    ),
  },
  {
    selector: ".fields-btn",
    content: (
      <>
        <Typography marginTop="15px">
          All your HubSpot fields are fetched here. You can drag and drop them
          onto your form layout.
        </Typography>
      </>
    ),
  },
  {
    selector: ".theme-btn",
    content: (
      <>
        <Typography marginTop="15px">
          Want to match your form with your website theme? You can do it here,
          with almost all color options and background image choices.
        </Typography>
      </>
    ),
  },
  {
    selector: ".logic-btn",
    content: (
      <>
        <Typography marginTop="15px">
          Show and hide fields based on user input. You can also set default
          values, and even steps can be configured to show or hide
        </Typography>
      </>
    ),
  },
  {
    selector: ".calc-btn",
    content: (
      <>
        <Typography marginTop="15px">
          Need some calculations in your form? You can do it here. Add internal
          values to your HubSpot select, radio, and checkbox options. You can
          also display conditional results.
        </Typography>
      </>
    ),
  },
  {
    selector: ".live_preview_btn",
    content: (
      <>
        <Typography marginTop="15px">
          Preview how your form will appear on your website. Customize the
          steps, styles, and other settings in the preview screen. Make any
          desired changes there, and return to this screen to save your
          modifications
        </Typography>
      </>
    ),
  },
  {
    selector: ".view_btn_group",
    content: (
      <>
        <Typography marginTop="15px">
          Preview how your form will appear on both desktop and mobile views.
          Make any necessary adjustments to ensure it looks great on both
          platforms.
        </Typography>
      </>
    ),
  },
  {
    selector: ".save_btn",
    content: (
      <>
        <Typography marginTop="15px">
          Once you done with your desired changes, don't forget to save it.
        </Typography>
      </>
    ),
  },
];

const slidesTour = [
  {
    selector: ".add-slide_btn",
    content: (
      <>
        <Typography marginTop="15px">
          Add new slide to your form. You can add as many slides as you want.
        </Typography>
      </>
    ),
  },
  {
    selector: ".slide_0",
    content: (
      <>
        <Typography marginTop="15px">
          Navigate to a slide by clicking on it, then use the edit pencil icon
          to rename it. You can also rearrange the slides using the drag button.
        </Typography>
      </>
    ),
  },
  {
    selector: ".end_screen",
    content: (
      <>
        <Typography marginTop="15px">
          Navigate to the end screen slide by clicking on it. Customize your end
          screen from here, and you can also add a redirect URL.
        </Typography>
      </>
    ),
  },
];
const useFormBuilder = () => {
  const [color, setColor] = useState("#FFA14E");
  const { formId } = useParams();
  const { getFeilds, getStepFormById, creteStepForm, editStepForm } =
    HubspotService();
  const { userValue } = UserService();
  const { user } = userValue();
  const {
    updateThemeSettings,
    handleEndScreenData,
    uiValue,
    createAndUpadateTour,
  } = UiService();
  const { isLoading, tour } = uiValue();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showArrowPopover, setShowArrowPopover] = useState(false);
  const [activeEditorIndex, setActieEditorIndex] = useState(null);
  const [editEndScreenTitle, setEditEndScreenTitle] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  const {
    uiRef,
    addSlide,
    changeActiveSlide,
    deleteSlide,
    updateLayots,
    handleresetUI,
    handleEndScreen,
    handleSelecteItem,
    handleFormValues,
  } = UiService();
  const {
    activeSlide,
    layoutData,
    activeEndScreen,
    endScreenData,
    themeSetting,
    logicData,
    calcResult,
  } = uiRef;

  const [openMedia, setOpenMedia] = useState(false);
  const [openPropertiesModal, setOpenPropertiesModal] = useState(false);
  const [sidebarLeft, setSidebarLeft] = useState(false);
  const [sidebarRight, setSidebarRight] = useState(false);
  const [activeMode, setActiveMode] = useState("desktop");
  const [formName, setFormName] = useState("");
  const [selectedSlideIndex, setselectedSlideIndexIndex] = useState("");
  const [togglePreview, setTogglePreview] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [slideActive, setSlideActive] = useState("");
  const [toggleLogic, setToggleLogic] = useState(false);
  const [toggleCalc, setToggleCalc] = useState(false);
  const query = new URLSearchParams(window.location.search);
  const [selectedIndex, setSelectedIndex] = useState<Number>();

  const [tourOpen, setTourOpen] = useState(false);
  const [slideTourOpen, setSlideTourOpen] = useState(false);
  const [slideTourPausedAt, setSlideTourPausedAt] = useState("");

  const closeTour = () => {
    setTourOpen(false);
    let tourData: any[] = [];
    if (tour != null) {
      tourData = [...tour];
    }
    tourData.push("create-form-tour");
    createAndUpadateTour(tourData);
  };

  const closeSlideTour = () => {
    setSlideTourOpen(false);
    let tourData: any[] = [];
    if (tour != null) {
      tourData = [...tour];
    }
    tourData.push("slide-tour");
    createAndUpadateTour(tourData);
  };

  useEffect(() => {
    setTimeout(() => {
      if (
        slideTourPausedAt == "slides" &&
        tour?.length &&
        !tour?.includes("slide-tour")
      ) {
        setSlideTourOpen(true);
      }
    }, 500);
  }, [slideTourPausedAt]);

  useEffect(() => {
    if (tour?.length && !tour.includes("create-form-tour")) {
      setTourOpen(true);
    }
  }, [tour]);

  const [colorAnchorElement, setColorAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const [showColorArrowPopover, setShowColorArrowPopover] = useState(false);

  const [activeTab, setActiveTab] = React.useState("2");

  const handleFormCreateAndUpdate = () => {
    const paylaod = {
      name: formName,
      formData: JSON.stringify(layoutData),
      themeSetting: JSON.stringify(themeSetting),
      endScreen: JSON.stringify(endScreenData),
      status: "published",
      logicData: JSON.stringify(logicData),
      calulation: JSON.stringify(calcResult),
    };
    let error = false;
    const errosCopy = { ...errors };
    if (!Boolean(formName)) {
      errosCopy.name = "Please enter form name.";
      error = true;
    }
    if (error) {
      setErrors(errosCopy);
      return;
    }
    if (!formId || query.get("clone")) {
      creteStepForm(paylaod);
    } else {
      //@ts-ignore
      paylaod._id = formId;
      editStepForm(paylaod);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const onArrowColorPopoverClose = () => {
    setColorAnchorElement(null);
    setShowColorArrowPopover(false);
  };

  const onColorFilterClick = (event: any) => {
    setColorAnchorElement(event.currentTarget);
    setShowColorArrowPopover(true);
  };
  const handleChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  const handleSlideDrop = ({ removedIndex, addedIndex }: any) => {
    const orderedSlides = arrayMoveImmutable(
      layoutData,
      removedIndex,
      addedIndex
    );

    updateLayots(orderedSlides);
  };

  function layoutDrag(ev: React.DragEvent<HTMLDivElement>, property: any) {
    ev.dataTransfer.setData("property", JSON.stringify(property));
  }

  function columnDrag(ev: React.DragEvent<HTMLDivElement>, property: any) {
    //if added module count is more than 10
    let moduleCount = 0;
    layoutData.forEach((slide: any) => {
      slide.data.forEach((section: any) => {
        section.columns.forEach((column: any) => {
          moduleCount = moduleCount + column.modules.length;
        });
      });
    });
    if (user.plan === "monthly" || user.plan === "yearly" || moduleCount < 10) {
      ev.dataTransfer.setData("property", JSON.stringify(property));
    } else {
      setShowUpgradeDialog(true);
    }

    console.log(layoutData, "moduleCount", moduleCount);
  }

  const handleThemeSettings = (key: string, value: string) => {
    const copySetting = { ...themeSetting };
    copySetting[key] = value;
    updateThemeSettings(copySetting);
  };
  const onMoreOptionsClick = (event: any, selectedIndex: string) => {
    event.preventDefault();
    setselectedSlideIndexIndex(selectedIndex);
    setAnchorEl(event.currentTarget);
    setShowArrowPopover(true);
  };
  const onArrowPopoverClose = () => {
    setShowArrowPopover(false);
    setAnchorEl(null);
  };
  const handleOnDeleteConfirmation = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
    setShowDeleteConfirmationDialog(true);
  };

  const moreOptions: any[] = [
    {
      optionName: "Edit Slide",
      icon: IconEdit,
    },
    {
      optionName: "Delete Slide",
      icon: IconTrash,
      onClickAction: handleOnDeleteConfirmation,
    },
  ];

  useEffect(() => {
    getFeilds();

    if (!formId) {
      handleresetUI();
    } else {
      getStepFormById(formId, setFormName);
    }
    handleSelecteItem(null);
    changeActiveSlide(0);
    handleEndScreen(false);
    handleFormValues({});
  }, [formId]);

  const handleOnCloseConfirmationDialog = () => {
    setShowDeleteConfirmationDialog(false);
  };

  const handleOnDeleteSlide = async () => {
    setShowDeleteConfirmationDialog(false);
    deleteSlide(selectedIndex);
  };

  const upadteEndScreenTitle = (value: string) => {
    const endDataCopy = { ...endScreenData };
    endDataCopy.slide_title = value;

    handleEndScreenData(endDataCopy);
  };

  const updateErrors = (key: string) => {
    const errosCopy = { ...errors };
    delete errosCopy[key];

    setErrors(errosCopy);
  };

  return {
    color,
    setColor,
    openMedia,
    setOpenMedia,
    colorAnchorElement,
    showColorArrowPopover,
    onArrowColorPopoverClose,
    onColorFilterClick,
    handleChangeComplete,
    openPropertiesModal,
    setOpenPropertiesModal,
    handleTabChange,
    activeTab,
    layoutDrag,
    columnDrag,
    handleThemeSettings,
    themeSetting,
    activeSlide,
    layoutData,
    addSlide,
    changeActiveSlide,
    deleteSlide,
    sidebarLeft,
    setSidebarLeft,
    sidebarRight,
    setSidebarRight,
    handleSlideDrop,
    activeMode,
    setActiveMode,
    handleFormCreateAndUpdate,
    formName,
    setFormName,
    handleEndScreen,
    activeEndScreen,
    onMoreOptionsClick,
    onArrowPopoverClose,
    moreOptions,
    anchorEl,
    showArrowPopover,
    selectedSlideIndex,
    togglePreview,
    setTogglePreview,
    activeEditorIndex,
    setActieEditorIndex,
    editEndScreenTitle,
    setEditEndScreenTitle,
    endScreenData,
    upadteEndScreenTitle,
    errors,
    updateErrors,
    slideActive,
    setSlideActive,
    toggleLogic,
    setToggleLogic,
    toggleCalc,
    setToggleCalc,
    handleOnDeleteConfirmation,
    showDeleteConfirmationDialog,
    handleOnDeleteSlide,
    handleOnCloseConfirmationDialog,
    sidebarSteps,
    slidesTour,
    closeTour,
    tourOpen,
    slideTourPausedAt,
    slideTourOpen,
    setSlideTourPausedAt,
    closeSlideTour,
    showUpgradeDialog,
    setShowUpgradeDialog,
  };
};

export default useFormBuilder;
