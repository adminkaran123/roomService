import { styled, Stack } from "@mui/material";

export const Wrapper = styled(Stack)``;
export const ItemWrapper = styled(Stack)`
  overflow-y: auto;
  margin-top: 20px;
  height: calc(100vh - 280px);
  margin: 20px -24px 0;
  padding: 0 20px;
  display: block;
  .property-item {
    width: 100%;
    padding: 15px;
    margin: 4px 4px 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: none;
    border: 1px solid #ccc;
  }
`;
