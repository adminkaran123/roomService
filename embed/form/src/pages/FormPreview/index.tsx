// @ts-nocheck
import { CssBaseline } from "@mui/material";

import { ContentBox, Wrapper } from "./FormPreview.styles";

import ArrowPopover from "../../components/arrowPopover/ArrowPopover";
import useFormPreview from "./FormPreview.hooks";
import Preview from "../../components/Builder/Preview";
import { OptionsBox } from "../../components/datagrid/DataGrid.styles";
import ListItem from "../../components/listItems/listItem/ListItem";

export default function FormPreview() {
  const {
    themeSetting,
    layoutData,
    activeMode,
    onArrowPopoverClose,
    moreOptions,
    anchorEl,
    showArrowPopover,
  } = useFormPreview();

  return (
    <>
      <CssBaseline />
      <Wrapper sx={{ flexGrow: 1 }}>
        <div className="form-area">
          <ContentBox>
            {/* <BuilderLayout /> */}
            <Preview
              activeMode={activeMode}
              previewType={themeSetting.preview_type}
            />
            {/* <FormEditor /> */}
          </ContentBox>
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
