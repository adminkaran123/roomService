import { Popover, styled } from '@mui/material';

export const StyledPopover = styled(Popover)<{
  isdark?: string;
  showarrow?: string;
}>`
  .MuiBox-root {
    max-height: ${(props) => {
      if (props.showarrow === 'true') return 'calc(100vh - 80px)';
      else return '220px';
    }};
  }

  .MuiPopover-paper {
    background-color: ${(p) => {
      // @ts-ignore
      return p.theme.palette.grey.dark;
    }};

    background-color: ${(props) => {
      // @ts-ignore
      if (props.isdark === 'true') return props.theme.palette.grey.dark;
      else return props.theme.palette.background.paper;
    }};
  }
  .MuiPaper-root {
    min-width: 228px;
    border-radius: 10px;
    overflow-y: auto;
    overflow-x: ${(props) => {
      if (props.showarrow === 'true') return 'visible';
      else return 'none';
    }};
    box-shadow: 0 0 22px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 0 22px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 0 22px rgba(0, 0, 0, 0.3);
    margin-top: 10px;
  }

  .MuiList-root {
    max-height: 650px;
    overflow: auto;
  }

  .MuiPaper-root:before {
    display: ${(props) => {
      if (props.showarrow === 'true') return '';
      else return 'none';
    }};
    content: '';
    height: 0;
    position: absolute;
    width: 0;
    border: 10px solid transparent;
    border-bottom-color: ${(props) => {
      // @ts-ignore
      if (props.isdark === 'true') return props.theme.palette.grey.dark;
      else return props.theme.palette.background.paper;
    }};
    margin-right: '-0.71em';
    overflow: visible;
    top: -20px;
    right: 20px;
  }
`;
