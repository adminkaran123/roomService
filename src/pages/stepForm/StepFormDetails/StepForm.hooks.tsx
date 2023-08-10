import React, { useState, useEffect } from "react";
import { HubspotService, UiService } from "../../../services";
import { arrayMoveImmutable } from "array-move";

const useFormBuilder = () => {
  const [color, setColor] = useState("#FFA14E");
  const { getFeilds, updateThemeSettings, hubspotRef } = HubspotService();
  const { uiRef, addSlide, changeActiveSlide, deleteSlide, updateLayots } =
    UiService();
  const { activeSlide, layoutData } = uiRef;
  const { themeSetting } = hubspotRef;
  const [openMedia, setOpenMedia] = useState(false);
  const [openPropertiesModal, setOpenPropertiesModal] = useState(false);
  const [sidebarLeft, setSidebarLeft] = useState(true);
  const [sidebarRight, setSidebarRight] = useState(true);
  const [activeMode, setActiveMode] = useState("desktop");

  const [colorAnchorElement, setColorAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const [showColorArrowPopover, setShowColorArrowPopover] = useState(false);

  const [activeTab, setActiveTab] = React.useState("1");

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

  useEffect(() => {
    getFeilds();
  }, []);

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
  };
};

export default useFormBuilder;
