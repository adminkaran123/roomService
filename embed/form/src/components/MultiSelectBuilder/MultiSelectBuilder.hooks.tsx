import React, { useState, useEffect } from "react";
import { UiService } from "../../services";

const useMultiSelectBuilder = (handleLayoutProperty: Function) => {
  const { uiRef } = UiService();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { selectedItem } = uiRef;

  const handleAddMultiSelctItem = () => {
    const copiedItem = [...(selectedItem?.data.multi_select_option || [])];
    copiedItem.push({ title: "Item " + Number(copiedItem.length + 1) });
    handleLayoutProperty(
      "multi_select_option",
      //@ts-ignore
      copiedItem
    );
  };

  const updateMultiSelectItem = (index: number, value: string) => {
    const copiedItem = JSON.parse(
      JSON.stringify([...(selectedItem?.data.multi_select_option || [])])
    );
    copiedItem[index].title = value;
    handleLayoutProperty(
      "multi_select_option",
      //@ts-ignore
      copiedItem
    );
  };

  const deleteMultiSelectItem = (index: number) => {
    const copiedItem = JSON.parse(
      JSON.stringify([...(selectedItem?.data.multi_select_option || [])])
    );
    copiedItem.splice(index, 1);
    handleLayoutProperty(
      "multi_select_option",
      //@ts-ignore
      copiedItem
    );
  };

  return {
    selectedItem,
    updateMultiSelectItem,
    handleAddMultiSelctItem,
    deleteMultiSelectItem,
    selectedIndex,
    setSelectedIndex,
  };
};

export default useMultiSelectBuilder;
