import { SvgIcon, SvgIconProps } from "@mui/material";
import { memo } from "react";

interface Props extends SvgIconProps {
  icon: string;
}

function IconSvg(props: Props) {
  const { icon, ...other } = props;
  return (
    <SvgIcon {...other}>
      <path d={icon} />
    </SvgIcon>
  );
}
export default memo(IconSvg);
