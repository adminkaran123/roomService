import { BoxProps, Breadcrumbs } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  BreadcrumbLink,
  Image,
  MainStack,
  SubtitleTypography,
} from "./Breadcrumb.styles";
import { Separator } from "./Breadcrumb.styles";

interface Props extends BoxProps {
  breadcrumbs: any[];
  noMargin?: boolean;
}

export default function Breadcrumb(props: Props) {
  const { breadcrumbs, noMargin = false } = props;
  return (
    <MainStack spacing={2} no_margin={noMargin.toString()}>
      <Breadcrumbs separator={<Separator />} aria-label="breadcrumb">
        {breadcrumbs.map((item: any) => {
          const { name, id, link, hasBackIcon } = item;
          if (link) {
            return (
              <BreadcrumbLink color="text.primary" key={id} href={link}>
                {hasBackIcon && <ArrowBackIosIcon />}
                {name}
              </BreadcrumbLink>
            );
          }
          return <SubtitleTypography key={id}>{name}</SubtitleTypography>;
        })}
      </Breadcrumbs>
    </MainStack>
  );
}
