import { useState } from "react";

const usePaddingMarginSetting = () => {
  const [activeTab, setActiveTab] = useState("padding");

  return {
    setActiveTab,
    activeTab,
  };
};

export default usePaddingMarginSetting;
