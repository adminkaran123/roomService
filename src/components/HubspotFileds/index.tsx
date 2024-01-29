import * as React from "react";

import { Wrapper, ItemWrapper } from "./HubSpotFileds.styles";
import {
  Button,
  Card,
  Typography,
  DialogProps,
  IconButton,
  InputBase,
  Paper,
  Box,
  Tooltip,
} from "@mui/material";
import CustomModal from "../CustomModal";
import SearchIcon from "@mui/icons-material/Search";
import { feidTypes } from "../../utils/constants/constants";

import useHubSpotFileds from "./HubSpotFileds.hooks";

interface Props {
  columnDrag: Function;
}

export default function HubSpotFileds(props: Props) {
  const { properties, search, setSearch, layoutData } = useHubSpotFileds();
  const { columnDrag } = props;

  return (
    <Wrapper>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          boxShadow: "none",
          border: "1px solid #ccc",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Form Fields"
          value={search}
          onChange={(e) => {
            console.log("e", e);
            //@ts-ignore
            setSearch(e?.target.value);
          }}
          inputProps={{ "aria-label": "search Form Fields" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <ItemWrapper>
        {properties
          ?.filter((property: any) => {
            if (search == "") {
              return true;
            } else {
              return property.label
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase());
            }
          })
          .filter((property: any) => {
            return !layoutData.some((slide: any) =>
              slide.data.some((item: any) =>
                item?.columns?.some((col: any) =>
                  col.modules?.some(
                    (module: any) => module.name === property?.name
                  )
                )
              )
            );
          })
          ?.map((property: any) => {
            return (
              <Card
                className="property-item"
                component={Button}
                key={property.name}
                onClick={() => {
                  // insertBlock(property?.fieldType);
                  // handleClose();
                }}
                draggable
                onDragStart={(ev) =>
                  columnDrag(ev, { ...property, hsProperty: true })
                }
              >
                <Typography className="property-type" variant="caption">
                  {feidTypes[property?.fieldType] || ""}
                </Typography>
                <Tooltip title={property.label}>
                  <Typography className="label_name" component="p">
                    {property.label.substring(0, 18) + "..."}
                  </Typography>
                </Tooltip>
              </Card>
            );
          })}
      </ItemWrapper>
    </Wrapper>
  );
}
