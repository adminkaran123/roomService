import { Stack, styled } from "@mui/material";
export const Wrapper = styled(Stack)`
  padding-top: 90px;
`;

export const ContentBox = styled(Stack)`
  background: #1a2027;
  padding: 10px 20px;
  height: calc(100vh - 110px);
  .extra_item {
    display: flex;
    flex-direction: column;
    paddng: 20px;
    margin: 10px 0;
    width: 48%;
    svg {
      width: 70px;
      height: 70px;
      fill: #fff;
    }
  }
`;
