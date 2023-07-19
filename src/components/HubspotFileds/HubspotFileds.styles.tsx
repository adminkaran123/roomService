import { styled, Stack } from "@mui/material";

export const Wrapper = styled(Stack)``;
export const ItemWrapper = styled(Stack)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y: auto;
  margin-top: 20px;
  margin: 20px -15px 0;
  height: calc(100vh - 280px);
  .property-item {
    width: calc(50% - 30px);
    padding: 15px;
    margin: 0 15px 20px;
    display: flex;
    flex-direction: column;
  }
`;
