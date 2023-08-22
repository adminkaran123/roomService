import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants/constants";
import { useNavigate } from "react-router";
import { UserService } from "../../services";
const useDashbaord = () => {
  const navigate = useNavigate();

  const { loadAuthCode } = UserService();

  const handleConnect = async () => {
    if (typeof window !== "undefined") {
      window.location.href = API_URL + "/oauth";
    }
  };

  const handleLoadAuthCode = async () => {
    loadAuthCode();
  };

  useEffect(() => {
    handleLoadAuthCode();
  }, []);

  return {
    handleConnect,
    navigate,
  };
};

export default useDashbaord;
