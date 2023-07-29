import React, { useState, useEffect } from "react";
import { UiService } from "../../services";

const useMediaBox = () => {
  const { uploadImage, getImages, uiRef } = UiService();
  const { images } = uiRef;

  const [activeTab, setActiveTab] = React.useState("1");
  useEffect(() => {
    getImages();
  }, []);

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
