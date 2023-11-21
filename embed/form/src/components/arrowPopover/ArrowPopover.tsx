import { Fade, PopoverProps } from '@mui/material';
import { memo } from 'react';

import { StyledPopover } from './ArrowPopover.styles';

interface Props extends PopoverProps {
  id: string;
  anchorEl: HTMLButtonElement | HTMLDivElement | HTMLAnchorElement | null;
  handleOnPopoverClose: any;
  content: any;
  isDark?: boolean;
  showArrow?: boolean;
}

function ArrowPopover(props: Props) {
  const {
    id,
    anchorEl,
    handleOnPopoverClose,
    content,
    isDark = true,
    showArrow = true,
    ...other
  } = props;

  return (
    <StyledPopover
      id={id}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      anchorEl={anchorEl}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 0 }}
      onClose={handleOnPopoverClose}
      isdark={isDark.toString()}
      showarrow={showArrow.toString()}
      {...other}
    >
      {content}
    </StyledPopover>
  );
}

export default memo(ArrowPopover);
