import { TextField, ButtonGroup, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { Wrapper } from "./PaddingMarginSetting styles";
import BorderAllIcon from "@mui/icons-material/BorderAll";
const PaddingMarginSetting = () => {
  // State to hold the padding value
  const [padding, setPadding] = useState(10); // Default padding value of 10px

  // Function to handle changes in the padding value
  const handlePaddingChange = (event: any) => {
    const newPadding = parseInt(event.target.value);
    setPadding(newPadding);
  };

  return (
    <Wrapper alignItems="center" direction="column">
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button>Padding</Button>
        <Button>Margin</Button>
      </ButtonGroup>
      <TextField
        type="number"
        //value={padding}
        //onChange={handlePaddingChange}
        className="top"
        inputProps={{ min: 0 }}
      />
      <BorderAllIcon className="center" />
      <TextField
        type="number"
        //value={padding}
        //onChange={handlePaddingChange}
        className="left"
        inputProps={{ min: 0 }}
      />
      <TextField
        type="number"
        //value={padding}
        //onChange={handlePaddingChange}
        className="right"
        inputProps={{ min: 0 }}
      />
      <TextField
        type="number"
        //value={padding}
        //onChange={handlePaddingChange}
        className="bottom"
        inputProps={{ min: 0 }}
      />
    </Wrapper>
  );
};

export default PaddingMarginSetting;
