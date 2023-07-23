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
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
          ],
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 50,
          paddingBottom: 50,
        });
      }
      if (data.column === 2 && data.leftSmall) {
        dataCopy.push({
          type: data?.type,
          columns: [
            {
              width: "33.3%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
            {
              width: "66.6%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
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
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
            {
              width: "33.3%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
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
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
            {
              width: "50%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
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
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
            {
              width: "33.3%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
            {
              width: "33.3%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
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
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
            {
              width: "25%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
            {
              width: "25%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
            {
              width: "25%",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 20,
            },
          ],
        });
      }
    }

    setLayoutData(dataCopy);
  }

  return {
    allowlayuotDrop,
    layuotDrop,
    layoutData,
  };
};

export default useBuilder;
