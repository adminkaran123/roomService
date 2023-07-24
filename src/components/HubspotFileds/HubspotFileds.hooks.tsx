import { useState } from "react";
import { HubspotService } from "../../services";

import { proprtyDummyData } from "../../utils/constants/constants";

const useHubspotFileds = () => {
  const { hubspotRef } = HubspotService();
  const { properties } = hubspotRef;

  return {
    properties: proprtyDummyData,
  };
};

export default useHubspotFileds;
