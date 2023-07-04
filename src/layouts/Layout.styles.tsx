import { Box, styled } from "@mui/material";
const drawerWidth = 250;
export const LayoutContentWithSideBar = styled(Box)`
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
`;
