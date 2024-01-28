import React, { useState, useEffect } from "react";
import { UiService } from "../../services";
import { idID } from "@mui/material/locale";

const useMultiImageSelect = (updateInputValues: Function, formValues: any) => {
  const handleOptionSelect = (key: string, value: string, type: string) => {
    const copyItems = formValues[key] ? [...formValues[key]] : [];
    if (type !== "radio") {
      const itemIndex = copyItems.indexOf(value);
      if (itemIndex !== -1) {
        copyItems.splice(itemIndex, 1);
      } else {
        copyItems.push(value);
      }
      updateInputValues(key, copyItems.length > 0 ? copyItems : "");
    } else {
      updateInputValues(key, value);
    }
  };

  return {
    handleOptionSelect,
  };
};

export default useMultiImageSelect;
