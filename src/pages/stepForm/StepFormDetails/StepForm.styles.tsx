import { Stack, styled } from "@mui/material";
export const Wrapper = styled(Stack)`
  padding-top: 90px;
  display: flex;
  flex-direction: row;
  .sidebar {
    min-width: 300px;
    transition: width 0.3s ease;
    width: 300px;
    overflow: hidden;
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
    left: 30px;
    right: auto;
    z-index: 1;
    justify-content: flex-end;
    display: flex;
    &.right {
      justify-content: flex-start;
      right: 30px;
      left: auto;
      button {
        transform: rotate(180deg);
      }
    }
  }
  .form-area {
    min-width: calc(100% - 600px);
    padding: 0 30px;
    transition: all 0.3s ease;
    position: relative;
  }

  &.slide-right-remove .form-area,
  &.slide-left-remove .form-area {
    min-width: calc(100% - 300px);
  }

  &.slide-left-remove.slide-right-remove {
    min-width: 100%;
  }

  &.slide-left-remove .sidebar.left {
    min-width: 0;
    width: 0;
  }

  &.slide-left-remove.slide-right-remove .form-area {
    width: 100%;
  }

  &.slide-right-remove .sidebar.right {
    min-width: 0;
    width: 0;
  }
`;

export const SidebarBox = styled(Stack)`
  background: #1a2027;
  width: 300px;
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
    padding: 20px 20px 20px 10px;
    font-weight: normal;
    color: #fff;
    width: 100%;
    .dnd-handle.drag-handle {
      padding-right: 20px;
    }
    &.end_screen {
      padding-left: 55px;
    }
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
`;

export const ContentBox = styled(Stack)`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14);
  border-radius: 6px;
  position: relative;

  .form_footer {
    position: absolute;
    bottom: 0;
    background: #000;
    width: 100%;
    padding: 20px;
    left: 0;
    right: 0;
    button svg {
      width: 15px;
      height: 15px;
    }

    .next_btn svg {
      margin-left: 9px;
    }

    .back_btn {
      margin-right: 20px;
    }

    .back_btn svg {
      margin-right: 5px;
    }

    display: flex;
    &.mobile {
      width: 400px;
      margin: 0 auto;
    }
  }
`;
