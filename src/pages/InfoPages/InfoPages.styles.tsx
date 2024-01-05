import { Stack, styled } from "@mui/material";
import { CssBaseline, Container, Typography, Button } from "@mui/material";

export const RootContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .custom_card {
    border: 1px solid #ccc;
    width: 400px;
    text-align: center;
    padding-top: 60px;
  }
  .pulse svg {
    width: 100px;
    height: 100px;
    background: #1fbe79;
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 100px;
    font-family: sans-serif;
    text-transform: uppercase;
    animation: animate-pulse 3s linear infinite;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 40px;
  }
  @keyframes animate-pulse {
    0% {
      box-shadow: 0 0 0 0 rgb(31 190 121 / 70%), 0 0 0 0 rgba(31, 190, 121, 0.7);
    }
    40% {
      box-shadow: 0 0 0 50px rgba(31, 190, 121, 0),
        0 0 0 0 rgba(31, 190, 121, 0.7);
    }
    80% {
      box-shadow: 0 0 0 50px rgba(31, 190, 121, 0),
        0 0 0 30px rgba(31, 190, 121, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(31, 190, 121, 0),
        0 0 0 30px rgba(31, 190, 121, 0);
    }
  }
`;

export const SuccessText = styled(Typography)({
  marginBottom: "16px",
});

export const ContinueButton = styled(Button)({
  color: "#fff",
  borderRadius: "5px",

  marginTop: 20,
  padding: "10px 20px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#27ae60",
  },
});
