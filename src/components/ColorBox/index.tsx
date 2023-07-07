import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import { Wrapper } from "./ColorBox.styles";
import ArrowPopover from "../arrowPopover/ArrowPopover";
import useColorBox from "./ColorBox.hooks";
import { SketchPicker, SketchPickerProps } from "react-color";

interface Props extends SketchPickerProps {
  color: string;
  label?: string;
  setColor?: Function;
}

export default function ColorBox(props: Props) {
  const { color, label, setColor } = props;
  const {
    colorAnchorElement,
    showColorArrowPopover,
    onArrowColorPopoverClose,
    onColorFilterClick,
    onChangeComplete,
  } = useColorBox(setColor);

  return (
    <Wrapper>
      <label>{label}</label>
      <Stack direction="row">
        <TextField
          variant="outlined"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
          className="color_input"
        />
        <Button
          onClick={onColorFilterClick}
          style={{ background: color }}
          className="color_box"
        ></Button>
      </Stack>
      <ArrowPopover
        id={"filter_list_color"}
        anchorEl={colorAnchorElement}
        open={showColorArrowPopover}
        handleOnPopoverClose={onArrowColorPopoverClose}
        isDark={false}
        showArrow={false}
        content={
          <SketchPicker color={color} onChangeComplete={onChangeComplete} />
        }
      />
    </Wrapper>
  );
}
