import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const useListLayout = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showArrowPopover, setShowArrowPopover] = useState(false);
  const navigate = useNavigate();

  const onFilterClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setShowArrowPopover(true);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const onArrowPopoverClose = () => {
    setShowArrowPopover(false);
    setAnchorEl(null);
  };

  return {
    anchorEl,
    onFilterClick,
    showArrowPopover,
    onArrowPopoverClose,
    handleGoBack,
  };
};

export default useListLayout;
