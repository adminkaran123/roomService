import { useState } from "react";
import { set } from "lodash";
import { UiService, HubspotService } from "../../services/index";
import { setSelectedItem } from "../../redux/slices/uiSlice";

const useBuilder = () => {
  const { handleLayoutData, uiRef, handleSelecteItem } = UiService();
  const { hubspotRef } = HubspotService();
  const { themeSetting } = hubspotRef;
  const { layoutData, activeSlide, selectedItem } = uiRef;
  const [openMedia, setOpenMedia] = useState(false);

  const defaulSectionProperties = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 50,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    maxWidth: "100%",
    bgImage: "",
  };

  const defaultColumnProperties = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    module: null,
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
    const dataCopy: any = layoutData ? [...layoutData[activeSlide]] : [];
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
      console.log("ssssssss");
      ev.dataTransfer.setData("sectiondata", JSON.stringify(property));
    }
  }

  function sectionDrop(ev: any, selfIndex: number) {
    ev.preventDefault();
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));

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

  function handleDndDrop(ev: any, selfIndex: number, sectionIndex: number) {
    ev.preventDefault();
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));

    if (
      ev.dataTransfer.getData("property") &&
      !ev.dataTransfer.getData("columndata")
    ) {
      let data = JSON.parse(ev.dataTransfer.getData("property"));
      if (data.type !== "layout") {
        const copyColumn: any = [...dataCopy[sectionIndex].columns];
        copyColumn[selfIndex].module = data;

        dataCopy[sectionIndex].columns = [...copyColumn];
        handleLayoutData(dataCopy);
      } else {
        //copyColumn.splice(selfIndex, 0, columndata.data);

        let newData = addLayout(data, dataCopy);
        console.log("sectionIndex", sectionIndex);
        dataCopy.splice(sectionIndex + 1, 0, newData);
        handleLayoutData(dataCopy);
      }

      return;
    }
    //changing place of column
    if (ev.dataTransfer.getData("columndata")) {
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
            console.log("sectionIndex", sectionIndex);
          }
        }
      } else {
        copyColumn.splice(columndata.index, 1);
      }

      copyColumn.splice(selfIndex, 0, columndata.data);
      if (sectionIndex != columndata?.sectionIndex) {
        const ColWithUpdatedWidth = genrateWidth(copyColumn);
        console.log("dataCopy[sectionIndex]", dataCopy);
        dataCopy[sectionIndex].columns = [...ColWithUpdatedWidth];
      } else {
        dataCopy[sectionIndex].columns = [...copyColumn];
      }

      handleLayoutData(dataCopy);

      return;
    }
    if (ev.dataTransfer.getData("sectiondata")) {
      let sectionData = JSON.parse(ev.dataTransfer.getData("sectiondata"));
      console.log(selfIndex, sectionData.index);
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

  const deleteSection = (sectionIndex: number) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));
    dataCopy.splice(sectionIndex, 1);
    handleLayoutData(dataCopy);
  };
  const cloneSection = (sectionIndex: number) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));
    dataCopy.splice(sectionIndex, 0, dataCopy[sectionIndex]);
    handleLayoutData(dataCopy);
  };
  const editSection = (sectionIndex: number) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));
    handleSelecteItem({
      sectionIndex: sectionIndex,
      data: dataCopy[sectionIndex],
    });
  };

  const deleteColumn = (sectionIndex: number, selfIndex: number) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));
    dataCopy[sectionIndex].columns.splice(selfIndex, 1);
    dataCopy[sectionIndex].columns = genrateWidth(
      dataCopy[sectionIndex].columns
    );

    handleLayoutData(dataCopy);
  };
  const cloneColumn = (sectionIndex: number, selfIndex: number) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));
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
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));
    handleSelecteItem({
      sectionIndex: sectionIndex,
      columnIndex: selfIndex,
      data: dataCopy[sectionIndex].columns[selfIndex],
    });
  };
  const handleLayoutProperty = (key: string, value: string) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData[activeSlide]));

    if (selectedItem.data.type === "layout") {
      dataCopy[selectedItem.sectionIndex][key] = value;
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

    handleLayoutData(dataCopy);
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
  };
};

export default useBuilder;
