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
import useFormPreview from "./FormPreview.hooks";
import useFormBuilder from "../../components/Builder/Builder.hooks";
import Preview from "../../components/Builder/Preview";
import { OptionsBox } from "../../components/datagrid/DataGrid.styles";
import ListItem from "../../components/listItems/listItem/ListItem";
import useBuilder from "../../components/Builder/Builder.hooks";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ColorBox from "../../components/ColorBox";

export default function FormBuilder({ setTogglePreview }) {
  const {
    handleChangeComplete,
    handleThemeSettings,
    themeSetting,
    layoutData,
    changeActiveSlide,
    activeMode,
    setActiveMode,
    onArrowPopoverClose,
    moreOptions,
    anchorEl,
    handleFormValues,
    handleErrors,
    showArrowPopover,
  } = useFormPreview();

  const { changeFilterActiveSlide, bringInView, filterActiveSlide } =
    useBuilder();
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar className="toolbar">
          <Stack direction="row" justifyContent="space-between" width="100%">
            <IconButton
              onClick={() => {
                setTogglePreview(false);
                handleFormValues({});
                handleErrors({});
                handleSelecteItem(null);
                changeFilterActiveSlide(0);
              }}
              size="large"
              disableRipple
            >
              <ChevronLeftIcon
                style={{
                  width: "30px",
                  height: "30px",
                  fill: "#000",
                }}
              />
            </IconButton>
            <Typography variant="h3" paddingTop="10px">
              Live Preview
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                onClick={() => {
                  changeFilterActiveSlide(0);
                  bringInView();
                  handleFormValues({});
                  handleErrors({});
                  handleSelecteItem(null);
                }}
                size="large"
                disableRipple
              >
                <Typography color="#000" marginRight={"10px"}>
                  Restart
                </Typography>
                <RestartAltIcon
                  style={{
                    width: "30px",
                    height: "30px",
                    fill: "#000",
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
              label="Select Preview Style"
              onChange={(e) => {
                handleThemeSettings("preview_type", e.target.value);
              }}
              value={themeSetting.preview_type}
            >
              <MenuItem value="with_header_steps">With Header Steps</MenuItem>
              <MenuItem value="with_sidebar_steps">With Sidebar Steps</MenuItem>
              <MenuItem value="without_steps">Without Steps</MenuItem>
            </Select>
          </FormControl>
          <div className="preview_styles">
            <Stack spacing={2}>
              <ColorBox
                onChangeComplete={handleChangeComplete}
                label=" Step Background Color:"
                color={themeSetting.step_bg}
                setColor={(color: any) => {
                  handleThemeSettings("step_bg", color);
                }}
              />
              <ColorBox
                onChangeComplete={handleChangeComplete}
                label=" Step  Text Color:"
                color={themeSetting.step_text_color}
                setColor={(color: any) => {
                  handleThemeSettings("step_text_color", color);
                }}
              />

              <ColorBox
                onChangeComplete={handleChangeComplete}
                label=" Step Label Text Color:"
                color={themeSetting.step_label_text_color}
                setColor={(color: any) => {
                  handleThemeSettings("step_label_text_color", color);
                }}
              />
              <ColorBox
                onChangeComplete={handleChangeComplete}
                label=" Step Active Backgroud Color:"
                color={themeSetting.step_active_bg}
                setColor={(color: any) => {
                  handleThemeSettings("step_active_bg", color);
                }}
              />
              <ColorBox
                onChangeComplete={handleChangeComplete}
                label=" Step Active Text Color:"
                color={themeSetting.step_active_text_color}
                setColor={(color: any) => {
                  handleThemeSettings("step_active_text_color", color);
                }}
              />
              <ColorBox
                onChangeComplete={handleChangeComplete}
                label=" Step Active Label Text Color:"
                color={themeSetting.step_active__label_text_color}
                setColor={(color: any) => {
                  handleThemeSettings("step_active__label_text_color", color);
                }}
              />
            </Stack>
          </div>
        </div>
        <div className="form-area">
          <ContentBox>
            {/* <BuilderLayout /> */}
            <Preview
              activeMode={activeMode}
              previewType={themeSetting.preview_type}
            />
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
