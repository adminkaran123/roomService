import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants/constants";
import { useNavigate } from "react-router";
const useDashbaord = () => {
  const navigate = useNavigate();
  const handleConnect = async () => {
    if (typeof window !== "undefined") {
      window.location.href = API_URL + "/oauth";
    }
  };

  return {
    handleConnect,
    navigate,
  };
};

export default useDashbaord;
