import { useState } from "react";

const useFormBuilder = () => {
  const [color, setColor] = useState("#FFA14E");
  const [openMedia, setOpenMedia] = useState(false);
  const [moduleAnchorElement, setModuleAnchorElement] =
    useState<HTMLButtonElement | null>(null);
  const [showModuleArrowPopover, setShowModuleArrowPopover] = useState(false);

  const onArrowModulePopoverClose = () => {
    setModuleAnchorElement(null);
    setShowModuleArrowPopover(false);
  };

  const onModuleFilterClick = (event: any) => {
    setModuleAnchorElement(event.currentTarget);
    setShowModuleArrowPopover(true);
  };
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  return {
    color,
    setColor,
    openMedia,
    setOpenMedia,
    moduleAnchorElement,
    showModuleArrowPopover,
    onArrowModulePopoverClose,
    onModuleFilterClick,
    handleChangeComplete,
  };
};

export default useFormBuilder;
