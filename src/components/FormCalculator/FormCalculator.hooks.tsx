import { useState } from "react";
import { UiService } from "../../services/index";

import { toast } from "react-toastify";

const useFormLogic = () => {
  const { uiRef, updateLogicData } = UiService();

  const [selectedType, setSelectedType] = useState("and");
  const [selectedInput, setSelectedInput] = useState("");
  const [addingData, setAddingData] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);

  const [editiEndScreen, setEditEndScreen] = useState(false);
  const { layoutData, logicData } = uiRef;

  const moduleList = () => {
    const modules = [];
    for (let slide: any = 0; slide < layoutData.length; slide++) {
      for (
        let section = 0;
        section < layoutData[slide].data.length;
        section++
      ) {
        for (
          let column = 0;
          column < layoutData[slide].data[section].columns.length;
          column++
        ) {
          //module checking
          for (
            let module = 0;
            module <
            layoutData[slide].data[section].columns[column].modules.length;
            module++
          ) {
            let moduleData =
              layoutData[slide].data[section].columns[column].modules[module];

            if (moduleData.hsProperty) {
              modules.push(moduleData);
            }
          }
        }
      }
    }

    return modules;
  };
  const addLogic = () => {
    setAddingData({
      title: "Condtion " + Number(logicData.length + 1),
      type: "and",
      ifItems: [
        {
          input: "",
          condition: "",
          compareValue: "",
        },
      ],
      thenItems: [
        {
          input: "",
          type: "show",
        },
      ],
    });
  };
  const cancelAdd = () => {
    setAddingData(null);
  };

  const updateIfValue = (key: string, value: string, index: number) => {
    const copyAddingData: any = JSON.parse(JSON.stringify(addingData));
    copyAddingData.ifItems[index][key] = value;
    if (key == "input") {
      copyAddingData.ifItems[index].condition = "";
      copyAddingData.ifItems[index].compareValue = "";
    }
    setAddingData(copyAddingData);
  };

  const updateThenValue = (key: string, value: string, index: number) => {
    const copyAddingData: any = JSON.parse(JSON.stringify(addingData));

    copyAddingData.thenItems[index][key] = value;
    if (key == "type") {
      copyAddingData.thenItems[index].input = "";
    }

    setAddingData(copyAddingData);
  };

  const chnageLogicType = (type: string) => {
    setAddingData({ ...addingData, type });
  };

  const addIfLogic = () => {
    if (
      addingData.ifItems.every((item: any) => {
        if (
          item.condition == "filled" ||
          item.condition == "empty" ||
          item.condition == "checked" ||
          item.condition == "not_checked"
        ) {
          return item.input !== "";
        }
        return (
          item.input !== "" && item.condition !== "" && item.compareValue !== ""
        );
      })
    ) {
      setAddingData({
        ...addingData,
        ifItems: [
          ...addingData.ifItems,
          {
            input: "",
            condition: "",
            compareValue: "",
          },
        ],
      });
    } else {
      toast.error("Please filled all values.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const addThenLogic = () => {
    if (
      addingData.thenItems.every((item: any) => {
        return item.input !== "" && item.type !== "";
      })
    ) {
      setAddingData({
        ...addingData,
        thenItems: [
          ...addingData.thenItems,
          {
            input: "",
            type: "show",
          },
        ],
      });
    } else {
      toast.error("Please filled all values.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deleteIf = (index: number) => {
    const Ifdata = [...addingData.ifItems];
    Ifdata.splice(index, 1);
    setAddingData({
      ...addingData,
      ifItems: Ifdata,
    });
  };

  const deleteThen = (index: number) => {
    const thendata = [...addingData.thenItems];
    thendata.splice(index, 1);
    setAddingData({
      ...addingData,
      thenItems: thendata,
    });
  };

  const saveLogic = () => {
    const logicDataCopy = [...logicData];
    if (
      addingData.thenItems.every((item: any) => {
        return item.input !== "" && item.type !== "";
      }) &&
      addingData.ifItems.every((item: any) => {
        if (
          item.condition == "filled" ||
          item.condition == "empty" ||
          item.condition == "checked" ||
          item.condition == "not_checked"
        ) {
          return item.input !== "";
        }
        return (
          item.input !== "" && item.condition !== "" && item.compareValue !== ""
        );
      })
    ) {
      logicDataCopy.push(addingData);
      updateLogicData(logicDataCopy);
      setAddingData(null);
    } else {
      toast.error("Please Complete all values.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deleteLogic = (index: number) => {
    const logicDataCopy = [...logicData];
    logicDataCopy.splice(index, 1);
    updateLogicData(logicDataCopy);
  };

  const editLogic = (data: any, index: number) => {
    setAddingData(data);
    setSelectedIndex(index);
  };

  return {
    layoutData,
    selectedType,
    setSelectedType,
    logicData,
    moduleList,
    selectedInput,
    setSelectedInput,
    addLogic,
    addingData,
    cancelAdd,
    chnageLogicType,
    updateIfValue,
    addIfLogic,
    deleteIf,
    updateThenValue,
    addThenLogic,
    deleteThen,
    saveLogic,
    deleteLogic,
    editLogic,
  };
};

export default useFormLogic;
