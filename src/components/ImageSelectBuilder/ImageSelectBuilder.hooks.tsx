import React, { useState, useEffect } from "react";
import { UiService } from "../../services";

const useMultiSelectBuilder = (
  handleLayoutProperty: Function,
  mapKey?: String
) => {
  const { uiRef } = UiService();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedImageItem, setSelctedImageItem] = useState<any>({});
  const [openMedia, setOpenMedia] = useState(false);

  const { selectedItem } = uiRef;

  const handleAddMultiSelctItem = () => {
    const copiedItem =
      //@ts-ignore
      [...(selectedItem?.data[mapKey] || [])];

    const newItem = {
      label: "Item " + Number(copiedItem.length + 1),
      image: "",
    };
    copiedItem.push(newItem);
    setSelctedImageItem(newItem);
    setSelectedIndex(copiedItem.length - 1);
    handleLayoutProperty(
      mapKey,
      //@ts-ignore
      copiedItem
    );
  };

  const handleEditMultiSelctItem = (item: any, index: number) => {
    setSelctedImageItem(item);
    setSelectedIndex(index);
  };

  const cancelEdit = () => {
    setSelctedImageItem({});
    setSelectedIndex(-1);
  };

  const saveItem = () => {
    const copiedItem = JSON.parse(
      //@ts-ignore
      JSON.stringify([...(selectedItem?.data[mapKey] || [])])
    );
    copiedItem[selectedIndex] = { ...selectedImageItem };
    handleLayoutProperty(
      mapKey,
      //@ts-ignore
      copiedItem
    );
    setSelctedImageItem({});
    setSelectedIndex(-1);
  };

  const deleteMultiSelectItem = (index: number) => {
    const copiedItem = JSON.parse(
      //@ts-ignore
      JSON.stringify([...(selectedItem?.data[mapKey] || [])])
    );
    copiedItem.splice(index, 1);
    handleLayoutProperty(
      mapKey,
      //@ts-ignore
      copiedItem
    );
  };

  const updateSelcteImageItem = (key: string, value: string) => {
    const copyItem = { ...selectedImageItem };
    copyItem[key] = value;
    setSelctedImageItem(copyItem);
  };

  return {
    selectedItem,
    handleAddMultiSelctItem,
    deleteMultiSelectItem,
    selectedIndex,
    setSelectedIndex,
    cancelEdit,
    handleEditMultiSelctItem,
    openMedia,
    setOpenMedia,
    selectedImageItem,
    updateSelcteImageItem,
    saveItem,
  };
};

export default useMultiSelectBuilder;
