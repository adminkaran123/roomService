import { useState } from "react";
import { set } from "lodash";
import { UiService } from "../../services/index";
import dayjs from "dayjs";
import { setSelectedItem } from "../../redux/slices/uiSlice";

const useBuilder = () => {
  const {
    handleLayoutData,
    uiRef,
    handleSelecteItem,
    changeActiveSlide,
    handleEndScreenData,
    handleEndScreen,
    handleTitle,
    onBoardUser,
    handleErrors,
    handleFormValues,
    changeFilterActiveSlide,
  } = UiService();

  const {
    layoutData,
    activeSlide,
    selectedItem,
    activeEndScreen,
    endScreenData,
    errors,
    formValues,
    filterActiveSlide,
    themeSetting,
    logicData,
    calcResult,
  } = uiRef;
  const [openMedia, setOpenMedia] = useState(false);

  const [editiEndScreen, setEditEndScreen] = useState(false);

  const defaulSectionProperties = {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    maxWidth: "100%",
    bgImage: "",
  };

  const defaultColumnProperties = {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    modules: [],
    type: "column",
    bgImage: "",
  };
  function allowDrop(ev: any) {
    ev.preventDefault();
  }
  const genrateColumn = (count: number) => {
    const columns = [];
    for (let i = 0; i < count; i++) {
      columns.push({
        width: (100 / count).toFixed(2) + "%",
        ...defaultColumnProperties,
      });
    }

    return columns;
  };

  const genrateWidth = (columns: [any]) => {
    let copyColumns = [...columns];
    for (let i = 0; i < copyColumns.length; i++) {
      copyColumns[i].width = (100 / columns?.length).toFixed(2) + "%";
    }

    return copyColumns;
  };

  function addLayout(data: any, dataCopy: any) {
    if (data?.type === "layout") {
      if (data.column === 2 && data.leftSmall) {
        return {
          type: data?.type,
          ...defaulSectionProperties,
          columns: [
            {
              width: "33.3%",
              ...defaultColumnProperties,
            },
            {
              width: "66.6%",
              ...defaultColumnProperties,
            },
          ],
        };
      } else if (data.column === 2 && data.rightSmall) {
        return {
          type: data?.type,
          ...defaulSectionProperties,
          columns: [
            {
              width: "66.6%",
              ...defaultColumnProperties,
            },
            {
              width: "33.3%",
              ...defaultColumnProperties,
            },
          ],
        };
      } else {
        return {
          type: data?.type,
          columns: genrateColumn(data.column),
          ...defaulSectionProperties,
        };
      }
    }
  }
  function layuotDrop(ev: any) {
    ev.preventDefault();
    const dataCopy: any = layoutData ? [...layoutData[activeSlide]?.data] : [];
    let data = null;
    if (ev.dataTransfer.getData("property")) {
      data = JSON.parse(ev.dataTransfer.getData("property"));
      if (dataCopy.length === 0 && data?.type === "layout") {
        let newData = addLayout(data, dataCopy);
        dataCopy.push(newData);
        handleLayoutData(dataCopy);
        ev.dataTransfer.setData("property", null);
      }
    }
  }

  function sectionDrag(ev: React.DragEvent<HTMLDivElement>, property: any) {
    //@ts-ignore
    if (ev.target?.classList?.contains("droparea")) {
      ev.stopPropagation();
      return;
    } else {
      ev.dataTransfer.setData("sectiondata", JSON.stringify(property));
    }
  }

  function sectionDrop(ev: any, selfIndex: number) {
    ev.preventDefault();
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;

    if (ev.dataTransfer.getData("sectiondata")) {
      let sectionData = JSON.parse(ev.dataTransfer.getData("sectiondata"));

      dataCopy[sectionData.index] = { ...dataCopy[selfIndex] };
      dataCopy[selfIndex] = sectionData.data;
      handleLayoutData(dataCopy);
    }
  }

  function columnDrag(ev: React.DragEvent<HTMLDivElement>, property: any) {
    ev.dataTransfer.setData("columndata", JSON.stringify(property));
    ev.dataTransfer.setData("property", "");
  }

  const updateInputValues = (name: string, value: any) => {
    const formCopy = { ...formValues };
    formCopy[name] = value;
    let errorsCopy = { ...errors };
    errorsCopy[name] = "";
    handleErrors(errorsCopy);

    handleFormValues(formCopy);
  };

  function moduleDrag(ev: React.DragEvent<HTMLDivElement>, property: any) {
    ev.dataTransfer.setData("moduleData", JSON.stringify(property));
    ev.dataTransfer.setData("property", "");
    ev.dataTransfer.setData("columndata", "");
  }

  function handleDndDrop(
    ev: any,
    selfIndex: number,
    sectionIndex: number,
    moduleIndex?: number
  ) {
    ev.preventDefault();
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;

    if (ev.dataTransfer.getData("moduleData")) {
      if (!moduleIndex) {
        moduleIndex = 0;
      }

      let recivedModule = JSON.parse(ev.dataTransfer.getData("moduleData"));

      if (
        recivedModule.colIndex == selfIndex &&
        recivedModule.sectionIndex == sectionIndex
      ) {
        const copyModules: any = [
          ...dataCopy[sectionIndex].columns[selfIndex].modules,
        ];

        copyModules[recivedModule.index] = copyModules[moduleIndex];
        copyModules[moduleIndex] = recivedModule.data;
        dataCopy[sectionIndex].columns[selfIndex].modules = [...copyModules];
      } else {
        const targetModules: any = [
          ...(dataCopy[sectionIndex].columns[selfIndex].modules || []),
        ];
        const dragAreaModules: any = [
          ...(dataCopy[recivedModule.sectionIndex].columns[
            recivedModule.colIndex
          ].modules || []),
        ];
        dragAreaModules.splice(recivedModule.index, 1);
        targetModules.push(recivedModule.data);

        dataCopy[sectionIndex].columns[selfIndex].modules = targetModules;
        dataCopy[recivedModule.sectionIndex].columns[
          recivedModule.colIndex
        ].modules = dragAreaModules;

        //remove module from column 1
      }

      handleLayoutData(dataCopy);

      return;
    }

    if (
      ev.dataTransfer.getData("property") &&
      !ev.dataTransfer.getData("columndata") &&
      !ev.dataTransfer.getData("moduleData")
    ) {
      let data = JSON.parse(ev.dataTransfer.getData("property"));
      if (data.type !== "layout") {
        const copyColumn: any = [...dataCopy[sectionIndex].columns];

        copyColumn[selfIndex].modules.push(data);

        dataCopy[sectionIndex].columns = [...copyColumn];
        handleLayoutData(dataCopy);
      } else {
        let newData = addLayout(data, dataCopy);
        dataCopy.splice(sectionIndex + 1, 0, newData);
        handleLayoutData(dataCopy);
      }

      return;
    }

    //changing place of column
    if (
      ev.dataTransfer.getData("columndata") &&
      !ev.dataTransfer.getData("moduleData")
    ) {
      let columndata: any = JSON.parse(ev.dataTransfer.getData("columndata"));
      const copyColumn: any = [...dataCopy[sectionIndex].columns];
      if (copyColumn.length >= 12) {
        return;
      }
      let insertTo = "right";
      if (
        sectionIndex == columndata?.sectionIndex &&
        selfIndex < columndata?.index
      ) {
        insertTo = "left";
      }

      if (sectionIndex != columndata?.sectionIndex) {
        const copydataColumn: any = [
          ...dataCopy[columndata?.sectionIndex].columns,
        ];
        copydataColumn.splice(columndata.index, 1);
        if (copydataColumn.length !== 0) {
          const dataColWithUpdatedWidth = genrateWidth(copydataColumn);
          dataCopy[columndata?.sectionIndex].columns = [
            ...dataColWithUpdatedWidth,
          ];
        } else {
          dataCopy.splice(columndata?.sectionIndex, 1);
          if (sectionIndex > columndata?.sectionIndex) {
            sectionIndex = sectionIndex - 1;
            columndata.sectionIndex = null;
          }
        }
      } else {
        copyColumn.splice(columndata.index, 1);
      }

      copyColumn.splice(selfIndex, 0, columndata.data);
      if (sectionIndex != columndata?.sectionIndex) {
        const ColWithUpdatedWidth = genrateWidth(copyColumn);

        dataCopy[sectionIndex].columns = [...ColWithUpdatedWidth];
      } else {
        dataCopy[sectionIndex].columns = [...copyColumn];
      }

      handleLayoutData(dataCopy);

      return;
    }
    if (
      ev.dataTransfer.getData("sectiondata") &&
      !ev.dataTransfer.getData("moduleData")
    ) {
      let sectionData = JSON.parse(ev.dataTransfer.getData("sectiondata"));

      if (selfIndex < sectionData.index) {
        dataCopy.splice(selfIndex, 0, sectionData.data);
        dataCopy.splice(sectionData.index + 1, 1);
      } else {
        dataCopy.splice(sectionData.index, 1);
        dataCopy.splice(selfIndex, 0, dataCopy[sectionData.index]);
        dataCopy[selfIndex] = sectionData.data;
      }
      handleLayoutData(dataCopy);
    }
  }

  const handleSlideTitle = (slideIndex: number, value: string) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[slideIndex]));

    dataCopy.slide_title = value;
    handleTitle(dataCopy);
  };

  const deleteSection = (sectionIndex: number) => {
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    dataCopy.splice(sectionIndex, 1);
    handleLayoutData(dataCopy);
  };
  const cloneSection = (sectionIndex: number) => {
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    dataCopy.splice(sectionIndex, 0, dataCopy[sectionIndex]);
    handleLayoutData(dataCopy);
  };
  const editSection = (sectionIndex: number) => {
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    handleSelecteItem({
      sectionIndex: sectionIndex,
      data: dataCopy[sectionIndex],
    });
  };

  const deleteColumn = (sectionIndex: number, selfIndex: number) => {
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    dataCopy[sectionIndex].columns.splice(selfIndex, 1);
    if (dataCopy[sectionIndex].columns.length == 0) {
      dataCopy.splice(sectionIndex, 1);
    } else {
      dataCopy[sectionIndex].columns = genrateWidth(
        dataCopy[sectionIndex].columns
      );
    }

    handleLayoutData(dataCopy);
  };
  const cloneColumn = (sectionIndex: number, selfIndex: number) => {
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    dataCopy[sectionIndex].columns.splice(
      selfIndex,
      0,
      dataCopy[sectionIndex].columns[selfIndex]
    );
    dataCopy[sectionIndex].columns = genrateWidth(
      dataCopy[sectionIndex].columns
    );

    handleLayoutData(dataCopy);
  };
  const editColumn = (sectionIndex: number, selfIndex: number) => {
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    handleSelecteItem({
      sectionIndex: sectionIndex,
      columnIndex: selfIndex,
      data: dataCopy[sectionIndex].columns[selfIndex],
    });
  };
  const editModule = (
    sectionIndex: number,
    columnIndex: number,
    moduleIndex: number
  ) => {
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    handleSelecteItem({
      sectionIndex: sectionIndex,
      columnIndex: columnIndex,
      moduleIndex: moduleIndex,
      data: dataCopy[sectionIndex].columns[columnIndex]?.modules[moduleIndex],
    });
  };
  const handleLayoutProperty = (key: string, value: string) => {
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;

    if (selectedItem.data.type === "layout") {
      dataCopy[selectedItem.sectionIndex][key].columns = value;
      handleSelecteItem({
        sectionIndex: selectedItem.sectionIndex,
        data: dataCopy[selectedItem.sectionIndex],
      });
    }
    if (selectedItem.data.type === "column") {
      dataCopy[selectedItem.sectionIndex].columns[selectedItem.columnIndex][
        key
      ] = value;

      handleSelecteItem({
        sectionIndex: selectedItem.sectionIndex,
        columnIndex: selectedItem.columnIndex,
        data: dataCopy[selectedItem.sectionIndex].columns[
          selectedItem.columnIndex
        ],
      });
    }

    if (
      selectedItem.data.type === "image" ||
      selectedItem.data.type === "rich_text" ||
      selectedItem?.data?.hsProperty
    ) {
      dataCopy[selectedItem.sectionIndex].columns[
        selectedItem.columnIndex
      ].modules[selectedItem.moduleIndex][key] = value;

      handleSelecteItem({
        sectionIndex: selectedItem.sectionIndex,
        columnIndex: selectedItem.columnIndex,
        moduleIndex: selectedItem.moduleIndex,
        data: dataCopy[selectedItem.sectionIndex].columns[
          selectedItem.columnIndex
        ]?.modules[selectedItem.moduleIndex],
      });
    }

    handleLayoutData(dataCopy);
  };

  function calculatePercentage(part: number, whole: number) {
    return ((part / whole) * 100).toFixed(2);
  }

  const minimum_size = 8.33;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  let element: any = null;
  let columnParent: any = null;
  let columnParentWidth = 0;
  let resizeColIndex = 0;
  let resizeSectionIndex = 0;
  const handleResize = (e: any) => {
    e.preventDefault();
    element = e.target.parentElement;
    columnParent = element.parentElement;
    resizeSectionIndex = columnParent.getAttribute("data-index");
    resizeColIndex = element.getAttribute("data-index");

    original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );
    columnParentWidth = parseFloat(
      getComputedStyle(columnParent, null)
        .getPropertyValue("width")
        .replace("px", "")
    );

    e.preventDefault();
    original_width = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("width")
        .replace("px", "")
    );
    original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );
    original_x = element.getBoundingClientRect().left;
    original_y = element.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  function stopResize() {
    window.removeEventListener("mousemove", resize);
  }

  function resize(e: any) {
    const width = original_width + (e.pageX - original_mouse_x);
    const percentWidth: any = calculatePercentage(width, columnParentWidth);

    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    const colRef = dataCopy[resizeSectionIndex].columns;

    let siblingNextWidth = colRef[Number(resizeColIndex) + 1].width.replace(
      "%",
      ""
    );
    let lastWidth = Number(colRef[resizeColIndex].width.replace("%", ""));
    let diifrence = lastWidth - percentWidth;
    let upadtedWidthForNext = Number(siblingNextWidth) + Number(diifrence);

    if (percentWidth > minimum_size && upadtedWidthForNext > minimum_size) {
      let nextElement = element.nextSibling;

      colRef[resizeColIndex].width = percentWidth + "%";

      colRef[Number(resizeColIndex) + 1].width = upadtedWidthForNext + "%";

      handleLayoutData(dataCopy);

      nextElement.style.width = upadtedWidthForNext + "%";
      element.style.width = percentWidth + "%";
    }
  }

  const changeEndScreenData = (key: string, value: string | boolean) => {
    const copySetting = { ...endScreenData };
    copySetting[key] = value;
    handleEndScreenData(copySetting);
  };
  const bringInView = () => {
    setTimeout(() => {
      let stepItem = document.querySelector(".active")!;

      stepItem.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  };

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
    const copiedItem = [...(selectedItem?.data.multi_select_option || [])];
    copiedItem[index].title = value;
    handleLayoutProperty(
      "multi_select_option",
      //@ts-ignore
      copiedItem
    );
  };

  const handleCheckboxChange = (module: any, event: any) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const checkValues = formValues[module.name]
      ? [...formValues[module.name]]
      : [];

    if (isChecked) {
      updateInputValues(module.name, [...checkValues, value]);
    } else {
      const filterItems = checkValues.filter((item) => item !== value);
      updateInputValues(
        module.name,
        filterItems.length === 0 ? "" : filterItems
      );
    }
  };

  const deleteFromSidebar = () => {
    const { sectionIndex, columnIndex, moduleIndex } = selectedItem;
    const dataCopy: any = JSON.parse(
      JSON.stringify(layoutData[activeSlide])
    ).data;
    if (selectedItem.hasOwnProperty("moduleIndex")) {
      dataCopy[sectionIndex].columns[columnIndex].modules.splice(
        moduleIndex,
        1
      );
    }

    handleLayoutData(dataCopy);
    handleSelecteItem(null);
  };

  const canShow = (moduleName: string) => {
    const relatedLogic = logicData.find((item: any) => {
      if (
        item?.thenItems.some(
          (thenItem: any) => thenItem.input.name == moduleName
        )
      ) {
        return true;
      }
    });

    if (!relatedLogic) {
      return true;
    } else {
      const relatedIf = [...relatedLogic.ifItems];
      const relatedThen = relatedLogic.thenItems.find(
        (thenItem: any) => thenItem.input.name == moduleName
      );
      let condition: any;

      for (const ifItem of relatedIf) {
        if (ifItem.condition === "filled") {
          condition = Array.isArray(formValues[ifItem.input.name])
            ? formValues[ifItem.input.name].length > 0
            : Boolean(formValues[ifItem.input.name]);
        }
        if (ifItem.condition === "empty") {
          condition = Array.isArray(formValues[ifItem.input.name])
            ? formValues[ifItem.input.name].length == 0
            : !Boolean(formValues[ifItem.input.name]);
        }
        if (ifItem.input.type != "date") {
          if (ifItem.condition === "contains") {
            condition = String(formValues[ifItem.input.name]).includes(
              ifItem.compareValue
            );
          }
          if (ifItem.condition === "not_contains") {
            condition = !String(formValues[ifItem.input.name]).includes(
              ifItem.compareValue
            );
          }

          if (ifItem.condition === "checked") {
            condition = formValues[ifItem.input.name];
          }
          if (ifItem.condition === "not_checked") {
            condition = formValues[ifItem.input.name];
          }

          if (ifItem.condition === "equal_to") {
            condition = formValues[ifItem.input.name] == ifItem.compareValue;
          }
          if (ifItem.condition === "not_equal_to") {
            condition = formValues[ifItem.input.name] != ifItem.compareValue;
          }
        } else {
          const date1 = dayjs(formValues[ifItem.input.name]);
          const date2 = dayjs(ifItem.compareValue);

          if (ifItem.condition === "equal_to") {
            condition = date1.isSame(date2);
          }
          if (ifItem.condition === "not_equal_to") {
            condition = !date1.isSame(date2);
          }
          if (
            ifItem.condition === "greater_than" &&
            formValues[ifItem.input.name]
          ) {
            condition = date1.isAfter(date2);
          }
          if (
            ifItem.condition === "lessar_than" &&
            formValues[ifItem.input.name]
          ) {
            condition = date1.isBefore(date2);
          }
        }

        if (condition && relatedLogic.type == "or") {
          break;
        }
      }

      if (relatedThen.type === "show" && condition) {
        return true;
      } else if (relatedThen.type === "hide" && !condition) {
        return true;
      }
      {
        return false;
      }
    }
  };

  const canShowSlide = (slideIndex: number) => {
    const relatedLogic = logicData.find((item: any) => {
      if (
        item?.thenItems.some((thenItem: any) => thenItem.input == slideIndex)
      ) {
        return true;
      }
    });

    if (!relatedLogic) {
      return true;
    } else {
      const relatedIf = [...relatedLogic.ifItems];
      const relatedThen = relatedLogic.thenItems.find(
        (thenItem: any) => thenItem.input == slideIndex
      );
      let condition: any;

      for (const ifItem of relatedIf) {
        if (ifItem.condition === "filled") {
          condition = Array.isArray(formValues[ifItem.input.name])
            ? formValues[ifItem.input.name].length > 0
            : Boolean(formValues[ifItem.input.name]);
        }
        if (ifItem.condition === "empty") {
          condition = Array.isArray(formValues[ifItem.input.name])
            ? formValues[ifItem.input.name].length == 0
            : !Boolean(formValues[ifItem.input.name]);
        }
        if (ifItem.input.type != "date") {
          if (ifItem.condition === "contains") {
            condition = String(formValues[ifItem.input.name]).includes(
              ifItem.compareValue
            );
          }
          if (ifItem.condition === "not_contains") {
            condition = !String(formValues[ifItem.input.name]).includes(
              ifItem.compareValue
            );
          }

          if (ifItem.condition === "checked") {
            condition = formValues[ifItem.input.name];
          }
          if (ifItem.condition === "not_checked") {
            condition = formValues[ifItem.input.name];
          }

          if (ifItem.condition === "equal_to") {
            condition = formValues[ifItem.input.name] == ifItem.compareValue;
          }
          if (ifItem.condition === "not_equal_to") {
            condition = formValues[ifItem.input.name] != ifItem.compareValue;
          }
        } else {
          const date1 = dayjs(formValues[ifItem.input.name]);
          const date2 = dayjs(ifItem.compareValue);

          if (ifItem.condition === "equal_to") {
            condition = date1.isSame(date2);
          }
          if (ifItem.condition === "not_equal_to") {
            condition = !date1.isSame(date2);
          }
          if (
            ifItem.condition === "greater_than" &&
            formValues[ifItem.input.name]
          ) {
            condition = date1.isAfter(date2);
          }
          if (
            ifItem.condition === "lessar_than" &&
            formValues[ifItem.input.name]
          ) {
            condition = date1.isBefore(date2);
          }
        }

        if (condition && relatedLogic.type == "or") {
          break;
        }
      }

      if (relatedThen.type === "show_slide" && condition) {
        return true;
      } else if (relatedThen.type === "hide_slide" && !condition) {
        return true;
      }
      {
        return false;
      }
    }
  };

  const canRedirect = () => {
    const relatedRedirects = logicData.filter((item: any) => {
      if (
        item?.thenItems.some(
          (thenItem: any) => thenItem.type == "custom_redirect"
        )
      ) {
        return true;
      }
    });

    relatedRedirects.forEach((relatedLogic: any) => {
      console.log("relatedLogic", relatedLogic);
      if (!relatedLogic) {
        return true;
      } else {
        const relatedIf = [...relatedLogic.ifItems];
        const relatedThen = relatedLogic.thenItems.find(
          (thenItem: any) => thenItem.type == "custom_redirect"
        );
        let condition: any;

        for (const ifItem of relatedIf) {
          if (ifItem.condition === "filled") {
            condition = Array.isArray(formValues[ifItem.input.name])
              ? formValues[ifItem.input.name].length > 0
              : Boolean(formValues[ifItem.input.name]);
          }
          if (ifItem.condition === "empty") {
            condition = Array.isArray(formValues[ifItem.input.name])
              ? formValues[ifItem.input.name].length == 0
              : !Boolean(formValues[ifItem.input.name]);
          }
          if (ifItem.input.type != "date") {
            if (ifItem.condition === "contains") {
              condition = String(formValues[ifItem.input.name]).includes(
                ifItem.compareValue
              );
            }
            if (ifItem.condition === "not_contains") {
              condition = !String(formValues[ifItem.input.name]).includes(
                ifItem.compareValue
              );
            }

            if (ifItem.condition === "checked") {
              condition = formValues[ifItem.input.name];
            }
            if (ifItem.condition === "not_checked") {
              condition = formValues[ifItem.input.name];
            }

            if (ifItem.condition === "equal_to") {
              condition = formValues[ifItem.input.name] == ifItem.compareValue;
            }
            if (ifItem.condition === "not_equal_to") {
              condition = formValues[ifItem.input.name] != ifItem.compareValue;
            }
          } else {
            const date1 = dayjs(formValues[ifItem.input.name]);
            const date2 = dayjs(ifItem.compareValue);

            if (ifItem.condition === "equal_to") {
              condition = date1.isSame(date2);
            }
            if (ifItem.condition === "not_equal_to") {
              condition = !date1.isSame(date2);
            }
            if (
              ifItem.condition === "greater_than" &&
              formValues[ifItem.input.name]
            ) {
              condition = date1.isAfter(date2);
            }
            if (
              ifItem.condition === "lessar_than" &&
              formValues[ifItem.input.name]
            ) {
              condition = date1.isBefore(date2);
            }
          }

          if (condition && relatedLogic.type == "or") {
            break;
          }
        }

        if (relatedThen.type === "custom_redirect" && condition) {
          window.open(relatedThen.input, "_blank");
        }
      }
    });
  };

  const filterLayoutData = layoutData.filter((_item: any, index: number) => {
    return canShowSlide(index);
  });

  const validateStep = (isPreview?: boolean) => {
    let hasError = false;
    let errors: any = {};

    const activeLayout = filterLayoutData?.[filterActiveSlide].data;

    for (let section = 0; section < activeLayout.length; section++) {
      for (
        let column = 0;
        column < activeLayout[section].columns.length;
        column++
      ) {
        //module checking
        for (
          let module = 0;
          module < activeLayout[section].columns[column].modules.length;
          module++
        ) {
          let moduleCopy =
            activeLayout[section].columns[column].modules[module];

          if (moduleCopy.required) {
            if (
              !formValues.hasOwnProperty(moduleCopy.name) ||
              !Boolean(formValues[moduleCopy.name])
            ) {
              errors[moduleCopy.name] = "This field is required.";
              hasError = true;
            }
          }
        }
      }
    }

    if (hasError) {
      let formWrapper = document.querySelector(".scroll_to_box")!;
      formWrapper.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else {
      if (filterLayoutData?.length - 1 === filterActiveSlide) {
        handleEndScreen(true);
        canRedirect();
        //redirect on the basis of  caluation
      } else {
        changeFilterActiveSlide(filterActiveSlide + 1);
      }
    }
    handleErrors(errors);
  };

  const getCalcResult = () => {
    let score = 0;

    layoutData.forEach((slide: any) => {
      slide.data.forEach((section: any) => {
        section.columns.forEach((column: any) => {
          column.modules
            .filter((module: any) => Boolean(formValues[module.name]))
            .forEach((module: any) => {
              var selectedOptions = module.options.filter((option: any) =>
                module.type !== "radio"
                  ? formValues[module.name].includes(option.value)
                  : option.value === formValues[module.name]
              );
              selectedOptions.forEach((option: any) => {
                if (!isNaN(option.calc_value)) {
                  if (option.operator == "+") {
                    score += Number(option.calc_value);
                  } else {
                    score -= Number(option.calc_value);
                  }
                }
              });
            });
        });
      });
    });

    return score;
  };

  return {
    allowDrop,
    layuotDrop,
    columnDrag,
    layoutData,
    handleDndDrop,
    sectionDrag,
    sectionDrop,
    deleteColumn,
    cloneColumn,
    editColumn,
    deleteSection,
    activeSlide,
    editSection,
    cloneSection,
    themeSetting,
    handleSelecteItem,
    selectedItem,
    handleLayoutProperty,
    openMedia,
    setOpenMedia,
    editModule,
    handleResize,
    moduleDrag,
    changeActiveSlide,
    activeEndScreen,
    endScreenData,
    editiEndScreen,
    setEditEndScreen,
    changeEndScreenData,
    handleEndScreen,
    handleSlideTitle,
    onBoardUser,
    bringInView,
    handleAddMultiSelctItem,
    updateMultiSelectItem,
    errors,
    updateInputValues,
    formValues,
    validateStep,
    handleErrors,
    handleFormValues,
    handleCheckboxChange,
    canShow,
    deleteFromSidebar,
    canShowSlide,
    filterLayoutData,
    changeFilterActiveSlide,
    filterActiveSlide,
    calcResult,
    getCalcResult,
  };
};

export default useBuilder;
