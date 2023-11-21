import React from "react";

import { Typography } from "@mui/material";
import { LoaderContainer, Loader } from "./FullpageLoader.styles";

const FullPageLoader = () => {
  return (
    <LoaderContainer>
      <Loader size={80} />
      <Typography variant="h6">Loading...</Typography>
    </LoaderContainer>
  );
};

export default FullPageLoader;
