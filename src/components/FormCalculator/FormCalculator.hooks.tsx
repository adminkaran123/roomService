import { useState } from "react";
import { UiService } from "../../services/index";

import { toast } from "react-toastify";

const useFormLogic = () => {
  const { uiRef, updateLayots, handleCalcResult } = UiService();

  const [selectedIndex, setSelectedIndex] = useState<any>(-1);

  const { layoutData, calcResult } = uiRef;

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
          column < layoutData[slide].data[section].columns?.length;
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
              if (
                (moduleData.fieldType == "select" ||
                  moduleData.fieldType == "checkbox" ||
                  moduleData.fieldType == "booleancheckbox" ||
                  moduleData.fieldType == "radio" ||
                  moduleData.advanced_type == "slider" ||
                  moduleData.advanced_type == "multi_select" ||
                  moduleData.fieldType == "number" ||
                  moduleData.advanced_type == "image_select") &&
                moduleData.name !== "hs_timezone" &&
                moduleData.name !== "hs_language"
              ) {
                modules.push(moduleData);
              }
            }
          }
        }
      }
    }

    return modules;
  };

  const updateValue = (
    moduleName: string,
    optionKey: string,
    key: string,
    index: number,
    value: any
  ) => {
    const layoutCopy = JSON.parse(JSON.stringify(layoutData));

    for (let slide: any = 0; slide < layoutData.length; slide++) {
      for (
        let section = 0;
        section < layoutData[slide].data.length;
        section++
      ) {
        for (
          let column = 0;
          column < layoutData[slide].data[section].columns?.length;
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
            if (moduleData.name == moduleName) {
              if (optionKey) {
                layoutCopy[slide].data[section].columns[column].modules[module][
                  optionKey
                ][index][key] = value;
              } else {
                layoutCopy[slide].data[section].columns[column].modules[module][
                  key
                ] = value;
              }
              updateLayots(layoutCopy);
              return;
            }
          }
        }
      }
    }
  };

  const updateResultValue = (key: string, value: any) => {
    const copyResultCalc = calcResult
      ? JSON.parse(JSON.stringify(calcResult))
      : {};
    copyResultCalc[key] = value;
    handleCalcResult(copyResultCalc);
  };

  const addMultiOption = () => {
    const multiCopy = JSON.parse(JSON.stringify(calcResult.multiType));
    multiCopy.push({
      content: JSON.stringify(
        '<h2 class="ql-align-center">Your Result</h2><p class="ql-align-center"><strong>{{result}}</strong></p><p class="ql-align-center"><br></p>'
      ),
      min: 0,
      max: 100,
    });
    updateResultValue("multiType", multiCopy);
  };

  const updateMultiValue = (key: string, index: number, value: string) => {
    const multiCopy = JSON.parse(JSON.stringify(calcResult.multiType));
    multiCopy[index][key] = value;
    updateResultValue("multiType", multiCopy);
  };

  const deleteMultipleValue = (index: number) => {
    const multiCopy = JSON.parse(JSON.stringify(calcResult.multiType));
    multiCopy.splice(index, 1);
    updateResultValue("multiType", multiCopy);
  };

  return {
    moduleList,
    selectedIndex,
    setSelectedIndex,
    updateValue,
    calcResult,
    updateResultValue,
    addMultiOption,
    updateMultiValue,
    deleteMultipleValue,
  };
};

export default useFormLogic;
