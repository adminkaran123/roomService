import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
const drawerWidth = 250;
export const LayoutContentWithSideBar = styled("div")`
  display: flex;
  .toolbar {
    padding-right: 24px;
  }
  .toolbarIcon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    min-height: 62px;
  }
  .appBar {
    z-index: 9999;
    transition: all 0.3s ease;
  }
  .appBarShift {
    margin-left: ${drawerWidth};
    width: calc(100% - ${drawerWidth}px);
    z-index: 10;
    transition: all 0.3s linear;
  }
  .menuButton {
    margin-right: 36px;
  }
  .menuButtonHidden {
    display: none;
  }
  .title: {
    flex-grow: 1;
  }
  .drawerPaper {
    position: relative;
    white-space: nowrap;
    width: ${drawerWidth}px;
    transition: all 0.3s linear;
  }
  .drawerPaperClose {
    overflow-x: hidden;
    width: 55px;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
  }
  .container {
    padding-top: 100px;
    padding-bottom: 50px;
    max-width: 100%;
  }
  .portals {
    width: 300px;
    position: absolute;
    right: 80px;
  }
  .menu_btn {
    position: absolute;
    right: 20px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .MuiMenu-list {
    width: 200px;
  }
`;

export const ListItemStyled = styled(NavLink)`
  color: #000000;
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 15px;
  text-decoration: none;
  &.active {
    background: #11c4e0;
    color: #fff;
    .icon {
      svg {
        fill: #fff;
      }
    }
  }
  .icon {
    min-width: 45px;
    svg {
      fill: #000000;
    }
  }
`;
