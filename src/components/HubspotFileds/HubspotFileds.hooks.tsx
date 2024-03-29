import { useState } from "react";
import { HubSpotService, UiService } from "../../services";

const useHubspotFileds = () => {
  const { hubspotRef } = HubSpotService();
  const { uiRef } = UiService();
  const { layoutData, activeSlide } = uiRef;

  const { properties } = hubspotRef;
  const [search, setSearch] = useState("");

  return {
    properties,
    search,
    setSearch,
    layoutData,
    activeSlide,
  };
};

export default useHubspotFileds;
