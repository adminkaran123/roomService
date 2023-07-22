import { useState } from "react";
import { set } from "lodash";

const useBuilder = () => {
  const [layoutData, setLayoutData] = useState<any>([]);
  function allowlayuotDrop(ev: any) {
    ev.preventDefault();
  }
  function layuotDrop(ev: any) {
    ev.preventDefault();
    let data = null;
    if (ev.dataTransfer.getData("property")) {
      data = JSON.parse(ev.dataTransfer.getData("property"));
    }

    const dataCopy = [...layoutData];

    if (data?.type === "layout") {
      if (data.column === 1) {
        dataCopy.push({
          type: data?.type,
          columns: [
            {
              width: "100%",
            },
          ],
        });
      }
      if (data.column === 2 && data.leftSmall) {
        dataCopy.push({
          type: data?.type,
          columns: [
            {
              width: "33.3%",
            },
            {
              width: "66.6%",
            },
          ],
        });
      }
      if (data.column === 2 && data.rightSmall) {
        dataCopy.push({
          type: data?.type,
          columns: [
            {
              width: "66.6%",
            },
            {
              width: "33.3%",
            },
          ],
        });
      }
      if (data.column === 2 && !data.leftSmall && !data.rightSmall) {
        dataCopy.push({
          type: data?.type,
          columns: [
            {
              width: "50%",
            },
            {
              width: "50%",
            },
          ],
        });
      }
      if (data.column === 3) {
        dataCopy.push({
          type: data?.type,
          columns: [
            {
              width: "33.3%",
            },
            {
              width: "33.3%",
            },
            {
              width: "33.3%",
            },
          ],
        });
      }
      if (data.column === 4) {
        dataCopy.push({
          type: data?.type,
          columns: [
            {
              width: "25%",
            },
            {
              width: "25%",
            },
            {
              width: "25%",
            },
            {
              width: "25%",
            },
          ],
        });
      }
    }

    setLayoutData(dataCopy);
  }
  const lastPoint: any = { x: null, y: null };
  function handleColumnResize(e: MouseEvent, layoutIndex: any, colIndex: any) {
    const leftOrRight =
      e.clientX > lastPoint.x
        ? "right"
        : e.clientX < lastPoint.x
        ? "left"
        : "none";

    lastPoint.x = e.clientX;
    lastPoint.y = e.clientY;
    console.log("leftOrRight", leftOrRight);
    const dataCopy = [...layoutData];
    console.log(layoutIndex, colIndex);

    var targtedElm = dataCopy[layoutIndex].columns[colIndex];

    if (leftOrRight === "left") {
      dataCopy[layoutIndex].columns[colIndex].width =
        parseInt(targtedElm.width) - 8.33 + "%";
    }

    setLayoutData(dataCopy);

    // if (currentResizer.classList.contains("bottom-right")) {
    //   element.style.width =
    //     e.pageX - element.getBoundingClientRect().left + "px";
    // }
  }

  return {
    allowlayuotDrop,

    layuotDrop,
    layoutData,
    handleColumnResize,
  };
};

export default useBuilder;
