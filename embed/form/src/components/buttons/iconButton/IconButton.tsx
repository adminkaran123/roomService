import { Button, ButtonProps, Icon } from '@mui/material';

interface Props extends ButtonProps {
  icon: string;
  altText: string;
}

export default function IconButton(props: Props) {
  const { icon, altText, children, ...other } = props;
  return (
    <Button
      startIcon={
        <Icon>
          <img alt={altText} src={icon} />
        </Icon>
      }
      {...other}
    >
      {children}
    </Button>
  );
}
