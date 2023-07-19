import { Stack, styled } from "@mui/material";
export const Wrapper = styled(Stack)`
  padding-top: 90px;
`;

export const ContentBox = styled(Stack)`
  background: #1a2027;
  padding: 10px 0px;
  height: calc(100vh - 110px);
  overflow-y: auto;
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
  .layout_box span {
    height: 60px;
    width: 100%;
    display: block;
    background: rgb(234, 240, 246);
  }

  .layout_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  .layout_box.two span {
    width: 45%;
  }
  .layout_box.three span {
    width: 30%;
  }

  .layout_box.left_min span:first-child,
  .layout_box.left_max span:last-child {
    width: 30%;
  }

  .layout_box.left_min span:last-child,
  .layout_box.left_max span:first-child {
    width: 65%;
  }
  .layout_box.four span {
    width: 22%;
  }
`;
