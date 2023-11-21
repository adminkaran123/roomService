import { useState } from "react";

const useDataGrid = (moreOptionsHandler: Function | undefined) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showArrowPopover, setShowArrowPopover] = useState(false);

  const onMoreOptionsClick = (event: any, selectedId: string) => {
    if (moreOptionsHandler) moreOptionsHandler(selectedId);
    setAnchorEl(event.currentTarget);
    setShowArrowPopover(true);
  };

  const onArrowPopoverClose = () => {
    setShowArrowPopover(false);
    setAnchorEl(null);
  };

  return {
    anchorEl,
    onMoreOptionsClick,
    showArrowPopover,
    onArrowPopoverClose,
  };
};

export default useDataGrid;
