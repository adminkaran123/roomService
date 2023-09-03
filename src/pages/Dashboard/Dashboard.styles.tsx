import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)`
  .custom_card {
    border: 1px solid #ccc;
  }
`;

export const IntegrationWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  justify-content: center;
  align-items: center;
  .relation_line {
    height: 2px;
    border-bottom: 7px dotted #333333;
    margin-right: 0px;
    width: 120px;
  }
`;

export const ConnectedBox = styled(Box)`
  margin: 0 auto;
  width: 240px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  border: 1px solid #ccc;
  background: #efefef;
  .icon_checked {
    position: absolute;
    right: -8px;
    top: -15px;
    background: #4691d4;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding-top: 4px;
  }

  .icon_checked svg {
    width: 30px;
    height: 30px;
    fill: #fff;
  }
`;
