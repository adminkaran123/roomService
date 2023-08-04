import { Stack, styled } from "@mui/material";
export const Wrapper = styled(Stack)`
  padding-top: 90px;
`;

export const SidebarBox = styled(Stack)`
  background: #1a2027;
  position: relative;
  padding: 10px 0px;
  .scroll-box {
    height: calc(100vh - 110px);
    overflow-y: auto;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
  }
  background-size: cover;
  background-repeat: no-repeat;
  .image_box {
    width: 200px;
    margin: 0 auto;
    position: relative;
  }

  .image_box .close_btn {
    position: absolute;
    right: 0;
    background: #3d3838;
    padding: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    min-width: auto;
    right: -15px;
    top: -15px;
  }

  .image_box .close_btn svg {
    width: 18px;
    fill: #fff;
  }

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
  .slide_btn {
    font-size: 18px;
    text-align: left;
    justify-content: flex-start;
    padding: 20px;
    font-weight: normal;
    color: #fff;
    &.active {
      background-color: rgba(41, 165, 255, 0.08);
    }
    .slide_box {
      width: 80px;
      height: 40px;
      background: #28a5ff;
      margin-right: 20px;
      border-radius: 5px;
    }
    .delete_btn {
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -16px;
    }
  }
  .sidebar_footer {
    position: absolute;
    bottom: 10px;
    background: #fff;
    border-radius: 10px;
    height: 50px;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    right: -88px;
    z-index: 1;
    justify-content: flex-end;
    display: flex;
    &.right {
      justify-content: flex-start;
      left: -88px;
      right: auto;
      button {
        transform: rotate(180deg);
      }
    }
  }
`;

export const ContentBox = styled(Stack)`
  height: calc(100vh - 160px);
  overflow-y: auto;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14);
  border-radius: 6px;
`;
