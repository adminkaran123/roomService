import React, { useState, useEffect } from "react";
import { UiService } from "../../services";
import { idID } from "@mui/material/locale";

const useMediaBox = (open: boolean) => {
  const { uploadImage, getImages, uiRef } = UiService();
  const { images } = uiRef;

  const [activeTab, setActiveTab] = React.useState("1");
  useEffect(() => {
    if (open) {
      getImages();
    }
  }, [open]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return {
    uploadImage,
    images,
    handleTabChange,
    activeTab,
  };
};

export default useMediaBox;
