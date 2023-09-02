import { Stack, styled } from "@mui/material";
export const Wrapper = styled(Stack)`
  padding-top: 90px;
  

  .slide_menu {
    width: 302px;
    border-right: 1px solid #dedede;
    position: fixed;
    left: 0;
    z-index: 10;
    height: calc(100vh - 65px);
    top: 65px;
    background: #ffffff;
    left: -320px;
    transition: all 0.3s ease;
    border-right:1px solid #eee;
    &.active {
      left: 120px;
    }
  }

  .slide_menu .close_btn {
    position: absolute;
    right: 0;
    top: 10px;
    z-index:11;
  }

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
    background: #333333;
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
    min-width: calc(100% - 120px);
    padding: 0 30px;
    transition: all 0.3s ease;
    position: relative;
    margin-left: 120px;
    &.active{
      min-width: calc(100% - 420px );
      margin-left: 420px;
    }
    
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
  .form-menu {
    width: 120px;
    border-right: 1px solid #dedede;
    position: fixed;
    left: 0;
    z-index: 11;
    height: calc(100vh - 65px);
    top: 65px;
    background: #ffffff;
  }

  .form-menu button {
    display: block;
    width: 100%;
    box-shadow: none;
    border-radius: 0;
    padding: 15px 10px;
    color: #333333;
    &.active {
      background: #777cf0;
      color: #fff;
      svg {
        fill: #fff;
      }
      p {
        color: #fff;
        font-weight: bold;
      }
    }

    

  .form-menu button p {
    font-size: 14px;
  }
  
`;

export const SidebarBox = styled(Stack)`
  background: #ffffff;
  width: 300px;
  position: relative;
  padding: 10px 0px;
  .scroll-box {
    height: calc(100vh - 110px);
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    margin-top: 35px;
    .slide_items {
      max-height: calc(100vh - 200px);
      overflow-y: auto;
    }
  }
  background-size: cover;
  background-repeat: no-repeat;

  .extra_item {
    display: flex;
    flex-direction: column;
    paddng: 20px;
    margin: 10px 0;
    width: 48%;
    box-shadow: none;
    border: 1px solid #ccc;
    svg {
      width: 70px;
      height: 70px;
      fill: #333333;
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
    border-radius: 0;
    justify-content: flex-start;
    padding: 20px 20px 20px 10px;
    font-weight: normal;
    color: #333333;
    width: 100%;
    .dnd-handle.drag-handle {
      padding-right: 20px;
      position: relative;
      top: 5px;
    }
    &.end_screen {
      padding-left: 20px;
      .slide_name {
        min-width: 100%;
      }
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
  .end_scren_heading {
    padding: 10px 20px;
    background: #eee;
    font-size: 16px;
    color: #000;
  }
  .item-scroller {
    padding: 10px;
    margin-top: 35px;
    overflow-y: auto;
    height: calc(100vh - 120px);
  }
`;

export const ContentBox = styled(Stack)`
  border: 1px solid #ccc;
  border-radius: 6px;
  position: relative;

  .form_footer {
    position: absolute;
    bottom: 0;
    background: #000;
    border
    width: 100%;
    padding: 20px;
    left: 0;
    right: 0;
    z-index:11;
    border-radius:0 0 6px 6px;
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
      position: relative;
      border-radius: 0 0 36px 36px;
      padding-left: 40px;
      padding-right: 40px;
    }
  }
`;
