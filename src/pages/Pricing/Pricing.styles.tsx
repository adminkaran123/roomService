import { Container, styled } from "@mui/material";
export const Wrapper = styled(Container)`
  padding-top: 50px;

  .how-it-works-container,
  .subscription-container {
    padding-top: 30px;
  }

  ul {
    font-family: inherit;
    padding: 0 0 0 20px;
    margin: 10px 0 30px;
  }

  ul li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 10px;
    font-size: 18px;
    list-style: none;
  }

  ul li:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--toastify-color-info);
    border-radius: 50%;
    left: 0;
    top: 5px;
  }
`;
