import * as React from "react";

import { Wrapper, ItemWrapper } from "./HubspotFileds.styles";
import {
  Button,
  Card,
  Typography,
  DialogProps,
  IconButton,
  InputBase,
  Paper,
  Box,
} from "@mui/material";
import CustomModal from "../CustomModal";
import SearchIcon from "@mui/icons-material/Search";
import { feidTypes } from "../../utils/constants/constants";

import useHubspotFileds from "./HubspotFileds.hooks";

interface Props extends DialogProps {
  handleClose: any;
  open: boolean;
  insertBlock: Function;
}

export default function HubspotFileds(props: Props) {
  const { properties } = useHubspotFileds();

  return (
    <Wrapper>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Form Feilds"
          inputProps={{ "aria-label": "search form feilds" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <ItemWrapper>
        {properties?.map((property) => {
          return (
            <Card
              className="property-item"
              component={Button}
              onClick={() => {
                insertBlock(property?.fieldType);
                handleClose();
              }}
            >
              <Typography className="property-type" variant="caption">
                {feidTypes[property?.fieldType] || ""}
              </Typography>
              <Typography className="name" component="p">
                {property.label}
              </Typography>
            </Card>
          );
        })}
      </ItemWrapper>
    </Wrapper>
  );
}
