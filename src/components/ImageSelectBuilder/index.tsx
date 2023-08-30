import React from "react";
import {
  Typography,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import { SelectWrapper } from "./ImageSelectBuilder.styles";
import useMultiSelectBuilder from "./ImageSelectBuilder.hooks";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import MediaBox from "../MediaBox";

interface Props {
  handleLayoutProperty: Function;
}

export default function MultiSelectBuilder(props: Props) {
  const { handleLayoutProperty } = props;
  const {
    selectedItem,
    handleAddMultiSelctItem,
    selectedIndex,
    deleteMultiSelectItem,
    handleEditMultiSelctItem,
    cancelEdit,
    updateSelcteImageItem,
    openMedia,
    selectedImageItem,
    setOpenMedia,
    saveItem,
  } = useMultiSelectBuilder(handleLayoutProperty);
  return (
    <SelectWrapper>
      {selectedIndex == -1 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          marginBottom={"10px"}
        >
          <Typography variant="h4">Add Options</Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              handleAddMultiSelctItem();
            }}
          >
            <AddIcon />
            <Typography>Add Option</Typography>
          </Button>
        </Stack>
      )}

      {selectedIndex !== -1 && (
        <>
          <div className="edit_box">
            <Stack>
              <TextField
                label="Option Name"
                value={selectedImageItem?.title}
                onChange={(e) => {
                  updateSelcteImageItem("title", e.target.value);
                }}
              />
            </Stack>
            {Boolean(selectedImageItem.image) && (
              <div className="image_box">
                <Button
                  className="close_btn"
                  onClick={() => {
                    updateSelcteImageItem("image", "");
                  }}
                >
                  <CloseIcon />
                </Button>
                <img src={selectedImageItem.image} width="200px" />
              </div>
            )}
            {Boolean(!selectedImageItem.image) && (
              <Button
                className="image-selector"
                onClick={() => setOpenMedia(true)}
              >
                <ImageIcon />
                <Typography>Select Image</Typography>
              </Button>
            )}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              marginTop="10px"
            >
              <Button variant="contained" onClick={saveItem}>
                Save
              </Button>
              <Button variant="outlined" onClick={cancelEdit}>
                Cancel
              </Button>
            </Stack>
          </div>
        </>
      )}
      {selectedIndex == -1 && (
        <>
          {selectedItem?.data?.multi_select_image_option?.map(
            (item: any, index: number) => {
              return (
                <Stack className="add_option" key={"item_" + index}>
                  <Typography>{item?.title}</Typography>

                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() => {
                        handleEditMultiSelctItem(item, index);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deleteMultiSelectItem(index);
                      }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </Stack>
                </Stack>
              );
            }
          )}
        </>
      )}
      {openMedia && (
        <MediaBox
          open={openMedia}
          handleClose={() => {
            setOpenMedia(false);
          }}
          handleSelectImage={(url: any) => {
            updateSelcteImageItem("image", url);
          }}
        />
      )}
    </SelectWrapper>
  );
}
