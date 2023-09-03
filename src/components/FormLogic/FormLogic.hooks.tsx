import { useState } from "react";
import { set } from "lodash";
import { UiService, HubspotService } from "../../services/index";
import { setSelectedItem } from "../../redux/slices/uiSlice";
import { arrayMoveImmutable } from "array-move";

const useFormLogic = () => {
  const { handleLayoutData, uiRef } = UiService();

  const [selectedType, setSelectedType] = useState("and");
  const [selectedInput, setSelectedInput] = useState("");
  const [addingData, setAddingData] = useState<any>(null);

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
      title: "Condtion " + logicData.length + 1,
      type: "and",
      ifItems: [
        {
          input: "",
          condition: "",
          compareValue: "",
        },
      ],
    });
  };
  const cancelAdd = () => {
    setAddingData(null);
  };

  const updateIfValue = (key: string, value: string, index: number) => {
    const copyAddingData: any = { ...addingData };
    copyAddingData.ifItems[index][key] = value;
    setAddingData(copyAddingData);
  };

  const chnageLogicType = (type: string) => {
    setAddingData({ ...addingData, type });
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
  };
};

export default useFormLogic;
