import { useState } from "react";
import { set } from "lodash";
import { UiService, HubspotService } from "../../services/index";
import { setSelectedItem } from "../../redux/slices/uiSlice";
import { arrayMoveImmutable } from "array-move";

const useFormLogic = () => {
  const { handleLayoutData, uiRef } = UiService();
  const { themeSetting } = uiRef;
  const [editiEndScreen, setEditEndScreen] = useState(false);
  const { layoutData, activeSlide, selectedItem, activeEndScreen } = uiRef;

  return {
    layoutData,
  };
};

export default useFormLogic;
