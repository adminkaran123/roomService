import { useState } from "react";
import { HubspotService } from "../../services";

import { proprtyDummyData } from "../../utils/constants/constants";

const useHubspotFileds = () => {
  const { hubspotRef } = HubspotService();
  console.log("hubspotRef", hubspotRef);
  const { properties } = hubspotRef;

  return {
    properties,
  };
};

export default useHubspotFileds;
