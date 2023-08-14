import { BoxProps, Button, Icon, Stack, Typography } from "@mui/material";
import { memo, MouseEventHandler, ReactNode } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import {
  ADD_ICON,
  CHEVRON_DOWN_BOLD_ICON,
  CHEVRON_UP_BOLD_ICON,
} from "../../utils/constants/svgContstants";

import Breadcrumb from "../breadcrumb/Breadcrumb";
import HorizontalBox from "../horizontalBox/HorizontalBox";
import IconSvg from "../Icon/IconSvg";
import SearchTextfield from "../textfields/searchTextfield/SearchTextfield";
import MainStack from "../mainStack/MainStack";
import { GoBackButton, OptionsBox, TitleDivider } from "./ListLayout.styles";
import useListLayout from "./ListLayoutHooks";
interface Props extends BoxProps {
  children: ReactNode;
  title?: string;
  addButtonText?: string;
  searchLabel?: string;
  onSearchChange?: Function;
  onAddNew?: MouseEventHandler;
  breadcrumbs?: any[];
  filterList?: any[] | null;
  onFilterChange?: Function;
  currentFilter?: string[];
  deleteButtonText?: string | null;
  onDelete?: Function;
  boxPadding?: string;
  boxMargin?: string;
  boxBackground?: string;
  customContent?: any;
  buttonType?: "text" | "outlined" | "contained";
  headerContent?: any;
  showGOBack?: boolean;
}

function ListLayout(props: Props) {
  const {
    title,
    addButtonText,
    children,
    searchLabel = "",
    onSearchChange,
    onAddNew,
    breadcrumbs,
    filterList = null,
    onFilterChange,
    currentFilter,
    deleteButtonText = null,
    onDelete,
    boxPadding = "0",
    boxBackground = "transparent",
    boxMargin = "16px 0 0",
    customContent,
    buttonType = "outlined",
    headerContent,
    showGOBack,

    ...other
  } = props;

  const {
    anchorEl,
    onFilterClick,
    showArrowPopover,
    onArrowPopoverClose,
    handleGoBack,
  } = useListLayout();
  return (
    <>
      <MainStack>
        {headerContent}
        {title && (
          <>
            <Typography variant="h2"> {title} </Typography>
            <TitleDivider />
          </>
        )}
        <Stack
          spacing={2}
          style={{
            background: boxBackground,
            padding: boxPadding,
            margin: boxMargin,
          }}
        >
          <HorizontalBox>
            {onSearchChange ? (
              <SearchTextfield
                fullWidth
                placeholder={searchLabel}
                onSearch={onSearchChange}
              />
            ) : (
              breadcrumbs && <Breadcrumb breadcrumbs={breadcrumbs} />
            )}

            {showGOBack ? (
              <GoBackButton
                variant="text"
                startIcon={
                  <Icon>
                    <ArrowBackIosIcon />
                  </Icon>
                }
                onClick={handleGoBack}
              >
                Go Back
              </GoBackButton>
            ) : null}
            {customContent}
            {addButtonText && (
              <Stack spacing={2} direction="row">
                {filterList && (
                  <Button
                    endIcon={
                      <IconSvg
                        icon={
                          anchorEl
                            ? CHEVRON_UP_BOLD_ICON
                            : CHEVRON_DOWN_BOLD_ICON
                        }
                      />
                    }
                    size="large"
                    variant="outlined"
                    color={anchorEl ? "primary" : "info"}
                    onClick={(event) => onFilterClick(event)}
                  >
                    Filters
                  </Button>
                )}

                <Button
                  data-id={
                    addButtonText.toLowerCase().replaceAll(" ", "-") + "-button"
                  }
                  startIcon={<IconSvg icon={ADD_ICON} />}
                  size="large"
                  variant="contained"
                  onClick={onAddNew}
                >
                  {addButtonText}
                </Button>
              </Stack>
            )}
          </HorizontalBox>

          {onSearchChange && breadcrumbs && (
            <Breadcrumb breadcrumbs={breadcrumbs} />
          )}

          {children}
        </Stack>
      </MainStack>
    </>
  );
}

export default memo(ListLayout);
