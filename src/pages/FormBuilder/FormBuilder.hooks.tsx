import React, { useState, useEffect } from "react";
import { HubspotService } from "../../services";

const useFormBuilder = () => {
  const [color, setColor] = useState("#FFA14E");
  const { getFeilds } = HubspotService();
  const [openMedia, setOpenMedia] = useState(false);
  const [openPropertiesModal, setOpenPropertiesModal] = useState(false);
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

  function drag(ev: React.DragEvent<HTMLDivElement>, property: any) {
    ev.dataTransfer.setData("property", JSON.stringify(property));
  }

  useEffect(() => {
    //getFeilds();
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

    drag,
  };
};

export default useFormBuilder;
