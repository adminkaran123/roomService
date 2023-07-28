import React, { useState, useEffect } from "react";
import { UiService } from "../../services";

const useMediaBox = () => {
  const { uploadImage } = UiService();
  useEffect(() => {}, []);

  return {
    uploadImage,
  };
};

export default useMediaBox;
