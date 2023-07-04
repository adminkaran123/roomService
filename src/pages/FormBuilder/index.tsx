import React from "react";
import { Box, Grid, Typography, IconButton, Stack } from "@mui/material";
import { ContentBox } from "./FormBuilder.styles";
import AddIcon from "@mui/icons-material/Add";
import FormEditor from "../../components/Editor";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import useFormBuilder from "./FormBuilder.hooks";

export default function FormBuilder() {
  const { color, setColor } = useFormBuilder();
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
            <Stack direction="row" justifyContent="flex-end">
              <IconButton title="Background Image">
                <WallpaperIcon />
              </IconButton>
              <IconButton title="Background Image">
                <ColorLensIcon />
              </IconButton>
            </Stack>
            <FormEditor />
          </ContentBox>
        </Grid>
        <Grid item xs>
          <ContentBox>xs</ContentBox>
        </Grid>
      </Grid>
    </Box>
  );
}
