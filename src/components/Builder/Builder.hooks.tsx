import { useState } from "react";
import { set } from "lodash";
import { UiService, HubspotService } from "../../services/index";
const useBuilder = () => {
  const { handleLayoutData, uiRef } = UiService();
  const { hubspotRef } = HubspotService();
  const { fieldSetting } = hubspotRef;
  const { layoutData } = uiRef;
  const defaultColumnProperties = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    module: null,
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
  function layuotDrop(ev: any) {
    ev.preventDefault();
    let data = null;
    if (ev.dataTransfer.getData("property")) {
      data = JSON.parse(ev.dataTransfer.getData("property"));
    }

    const dataCopy: any = layoutData ? [...layoutData] : [];

    if (data?.type === "layout") {
      if (data.column === 2 && data.leftSmall) {
        dataCopy.push({
          type: data?.type,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 50,
          paddingBottom: 50,
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
        });
      } else if (data.column === 2 && data.rightSmall) {
        dataCopy.push({
          type: data?.type,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 50,
          paddingBottom: 50,
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
        });
      } else {
        dataCopy.push({
          type: data?.type,
          columns: genrateColumn(data.column),
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 50,
          paddingBottom: 50,
        });
      }
      ev.dataTransfer.setData("property", null);
      handleLayoutData(dataCopy);
    }
  }

  function sectionDrag(ev: React.DragEvent<HTMLDivElement>, property: any) {
    console.log("ev");
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
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData));

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
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData));

    if (
      ev.dataTransfer.getData("property") &&
      !ev.dataTransfer.getData("columndata")
    ) {
      let data = JSON.parse(ev.dataTransfer.getData("property"));
      const copyColumn: any = [...dataCopy[sectionIndex].columns];
      copyColumn[selfIndex].module = data;

      dataCopy[sectionIndex].columns = [...copyColumn];
      handleLayoutData(dataCopy);

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
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData));
    dataCopy.splice(sectionIndex, 1);
    handleLayoutData(dataCopy);
  };
  const cloneSection = (sectionIndex: number) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData));
    dataCopy.splice(sectionIndex, 0, dataCopy[sectionIndex]);
    handleLayoutData(dataCopy);
  };
  const editSection = (sectionIndex: number) => {};

  const deleteColumn = (sectionIndex: number, selfIndex: number) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData));
    dataCopy[sectionIndex].columns.splice(selfIndex, 1);
    dataCopy[sectionIndex].columns = genrateWidth(
      dataCopy[sectionIndex].columns
    );

    handleLayoutData(dataCopy);
  };
  const cloneColumn = (sectionIndex: number, selfIndex: number) => {
    const dataCopy: any = JSON.parse(JSON.stringify(layoutData));
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
  const editColumn = (sectionIndex: number, selfIndex: number) => {};

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
    editSection,
    cloneSection,
    fieldSetting,
  };
};

export default useBuilder;
