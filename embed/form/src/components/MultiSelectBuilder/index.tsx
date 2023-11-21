import React from "react";
import { Typography, Button, Stack, IconButton } from "@mui/material";
import { SelectWrapper } from "./MultiSelectBuilder.styles";
import useMultiSelectBuilder from "./MultiSelectBuilder.hooks";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableText from "../EditableText";

interface Props {
  handleLayoutProperty: Function;
}

export default function MultiSelectBuilder(props: Props) {
  const { handleLayoutProperty } = props;
  const {
    selectedItem,
    updateMultiSelectItem,
    handleAddMultiSelctItem,
    selectedIndex,
    setSelectedIndex,
    deleteMultiSelectItem,
  } = useMultiSelectBuilder(handleLayoutProperty);
  return (
    <SelectWrapper>
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

      {selectedItem?.data?.multi_select_option?.map(
        (item: any, index: number) => {
          return (
            <Stack className="add_option" key={"item_" + index}>
              <EditableText
                initialName={item.title}
                isEditing={selectedIndex === index}
                setIsEditing={() => {
                  setSelectedIndex(index);
                }}
                onSave={(value) => {
                  updateMultiSelectItem(index, value);
                  setSelectedIndex(-1);
                }}
              />
              <IconButton
                onClick={() => {
                  deleteMultiSelectItem(index);
                }}
              >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </Stack>
          );
        }
      )}
    </SelectWrapper>
  );
}
