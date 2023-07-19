import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants/constants";
const useDashbaord = () => {
  const handleConnect = async () => {
    if (typeof window !== "undefined") {
      window.location.href = API_URL + "/oauth";
    }
  };

  return {
    handleConnect,
  };
};

export default useDashbaord;
