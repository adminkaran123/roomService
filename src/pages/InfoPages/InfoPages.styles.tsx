import { Stack, styled } from "@mui/material";
import { CssBaseline, Container, Typography, Button } from "@mui/material";
export const RootContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

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
