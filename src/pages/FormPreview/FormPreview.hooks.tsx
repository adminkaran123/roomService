import React, { useState, useEffect } from "react";
import { HubspotService, UiService } from "../../services";
import { arrayMoveImmutable } from "array-move";
import { useParams } from "react-router";

import IconEdit from "../../assets/icons/icon_edit.svg";
import IconTrash from "../../assets/icons/icon_trash.svg";

const useFormBuilder = () => {
  const [color, setColor] = useState("#FFA14E");
  const { formId } = useParams();
  const { getFeilds, getStepFormById, creteStepForm, editStepForm } =
    HubspotService();
  const { updateThemeSettings } = UiService();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showArrowPopover, setShowArrowPopover] = useState(false);

  const {
    uiRef,
    addSlide,
    changeActiveSlide,
    deleteSlide,
    updateLayots,
    handleresetUI,
    handleFormValues,
    handleSelecteItem,
    handleErrors,
    handleEndScreen,
  } = UiService();
  const {
    activeSlide,
    layoutData,
    activeEndScreen,
    endScreenData,
    themeSetting,
  } = uiRef;

  const [openMedia, setOpenMedia] = useState(false);
  const [openPropertiesModal, setOpenPropertiesModal] = useState(false);
  const [sidebarLeft, setSidebarLeft] = useState(false);
  const [sidebarRight, setSidebarRight] = useState(false);
  const [activeMode, setActiveMode] = useState("desktop");
  const [formName, setFormName] = useState("");
  const [selectedSlideIndex, setselectedSlideIndexIndex] = useState("");

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
    };
    if (!formId) {
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
    ev.dataTransfer.setData("property", JSON.stringify(property));
  }

  const handleThemeSettings = (key: string, value: string) => {
    const copySetting = { ...themeSetting };
    copySetting[key] = value;
    updateThemeSettings(copySetting);
  };
  const onMoreOptionsClick = (event: any, selectedId: string) => {
    event.preventDefault();
    setselectedSlideIndexIndex(selectedId);
    setAnchorEl(event.currentTarget);
    setShowArrowPopover(true);
  };
  const onArrowPopoverClose = () => {
    setShowArrowPopover(false);
    setAnchorEl(null);
  };
  const handleOnDeleteConfirmation = () => {};
  const handleOnEditClick = () => {};

  const moreOptions: any[] = [
    {
      optionName: "Edit Slide",
      icon: IconEdit,
      onClickAction: handleOnEditClick,
    },
    {
      optionName: "Delete Slide",
      icon: IconTrash,
      onClickAction: handleOnDeleteConfirmation,
    },
  ];

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
    handleresetUI,
    handleFormValues,
    handleErrors,
    handleSelecteItem,
  };
};

export default useFormBuilder;
