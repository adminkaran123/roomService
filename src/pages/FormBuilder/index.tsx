import React from "react";
import {
  Box,
  Grid,
  styled,
  Paper,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { ContentBox } from "./FormBuilder.styles";
import AddIcon from "@mui/icons-material/Add";
import FormEditor from "../../components/Editor";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FormBuilder() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <ContentBox>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Form Content</Typography>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Stack>
          </ContentBox>
        </Grid>
        <Grid item xs={7}>
          <ContentBox>
            <FormEditor />
          </ContentBox>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
