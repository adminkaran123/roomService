// @ts-nocheck
import {
  IconButton,
  Stack,
  AppBar,
  Toolbar,
  CssBaseline,
  Button,
  ButtonGroup,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";

import { ContentBox, Wrapper } from "./FormPreview.styles";
import LaptopIcon from "@mui/icons-material/Laptop";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowPopover from "../../components/arrowPopover/ArrowPopover";
import useFormBuilder from "./FormPreview.hooks";
import Builder from "../../components/Builder";
import { OptionsBox } from "../../components/datagrid/DataGrid.styles";
import ListItem from "../../components/listItems/listItem/ListItem";
import useBuilder from "../../components/Builder/Builder.hooks";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function FormBuilder({ setTogglePreview }) {
  const {
    color,
    handleChangeComplete,
    openMedia,
    setOpenMedia,
    colorAnchorElement,
    showColorArrowPopover,
    onArrowColorPopoverClose,
    handleTabChange,
    columnDrag,
    activeTab,
    layoutDrag,
    handleThemeSettings,
    themeSetting,
    activeSlide,
    layoutData,
    addSlide,
    changeActiveSlide,
    deleteSlide,
    sidebarLeft,
    setSidebarLeft,
    sidebarRight,
    setSidebarRight,
    handleSlideDrop,
    activeMode,
    setActiveMode,
    handleFormCreateAndUpdate,
    formName,
    setFormName,
    onArrowPopoverClose,
    handleEndScreen,
    activeEndScreen,
    moreOptions,
    anchorEl,
    showArrowPopover,
    selectedSlideIndex,
    onMoreOptionsClick,
  } = useFormBuilder();

  const { handleSlideTitle } = useBuilder();
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar className="toolbar">
          <Stack direction="row" justifyContent="space-between" width="100%">
            <IconButton
              onClick={() => {
                setTogglePreview(false);
              }}
              size="large"
              disableRipple
            >
              <ChevronLeftIcon
                style={{
                  width: "30px",
                  height: "30px",
                  fill: "#fff",
                }}
              />
            </IconButton>
            <Typography variant="h3" paddingTop="10px">
              Live Preview
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                onClick={() => {
                  changeActiveSlide(0);
                }}
                size="large"
                disableRipple
              >
                <Typography color="#fff" marginRight={"10px"}>
                  Restart
                </Typography>
                <RestartAltIcon
                  style={{
                    width: "30px",
                    height: "30px",
                    fill: "#fff",
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Wrapper sx={{ flexGrow: 1 }}>
        <div className="prrview_settings">
          <FormControl fullWidth>
            <InputLabel>Select Preivew Style</InputLabel>
            <Select
              value=""
              label="Select Preview Style"
              // onChange={(e) => {
              //  // handleThemeSettings("type", e.target.value);
              // }}
              //value={themeSetting.type}
            >
              <MenuItem value="with_header_steps">With Header Steps</MenuItem>
              <MenuItem value="with_sidebar_steps">With Sidebar Steps</MenuItem>
              <MenuItem value="without_steps">Without Steps</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-area">
          <ContentBox>
            {/* <BuilderLayout /> */}
            <Builder activeMode={activeMode} />
            {/* <FormEditor /> */}
          </ContentBox>

          <Stack justifyContent="center" direction="row" marginTop="20px">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                variant={activeMode == "desktop" ? "contained" : "outlined"}
                onClick={() => {
                  setActiveMode("desktop");
                }}
              >
                <LaptopIcon />
              </Button>
              <Button
                variant={activeMode == "mobile" ? "contained" : "outlined"}
                onClick={() => {
                  setActiveMode("mobile");
                }}
              >
                <StayCurrentPortraitIcon />
              </Button>
            </ButtonGroup>
          </Stack>
        </div>
      </Wrapper>

      <ArrowPopover
        id={"more_options"}
        anchorEl={anchorEl}
        open={showArrowPopover}
        handleOnPopoverClose={onArrowPopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        content={
          <OptionsBox>
            {moreOptions.map((item, index) => {
              if (
                !(layoutData.length == 1 && item.optionName == "Delete Slide")
              )
                return (
                  <ListItem
                    key={index}
                    item={item}
                    onClickAction={onArrowPopoverClose}
                  />
                );
            })}
          </OptionsBox>
        }
      />
    </>
  );
}
