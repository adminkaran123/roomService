import { ButtonProps, Typography } from '@mui/material';

import { OptionsButton } from './MoreOptionsButtons.styles';

interface Props extends ButtonProps {}

export default function MoreOptionsButton(props: Props) {
  const { ...other } = props;

  return (
    <OptionsButton variant="text" disableElevation {...other}>
      <Typography variant="caption">●●●</Typography>
    </OptionsButton>
  );
}
