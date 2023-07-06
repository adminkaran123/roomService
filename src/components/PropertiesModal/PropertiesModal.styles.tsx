import { styled, Stack } from "@mui/material";

export const Wrapper = styled(Stack)``;
export const ItemWrapper = styled(Stack)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 300px;
  overflow-y: auto;
  margin-top: 20px;
  .property-item {
    width: calc(25% - 30px);
    padding: 15px;
    margin: 0 15px 20px;
    display: flex;
    flex-direction: column;
  }
`;
