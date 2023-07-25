import { useState } from "react";
import { HubspotService } from "../../services";

import { proprtyDummyData } from "../../utils/constants/constants";

const useHubspotFileds = () => {
  const { hubspotRef } = HubspotService();
  const { properties } = hubspotRef;
  const [search, setSearch] = useState("");

  return {
    properties: proprtyDummyData,
    search,
    setSearch,
  };
};

export default useHubspotFileds;
