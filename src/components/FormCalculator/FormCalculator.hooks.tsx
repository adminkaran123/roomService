import { useState } from "react";
import { UiService } from "../../services/index";

import { toast } from "react-toastify";

const useFormLogic = () => {
  const { uiRef, updateLayots } = UiService();

  const [selectedIndex, setSelectedIndex] = useState<any>(-1);

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
              console.log("moduleData.advanced_type", moduleData.advanced_type);
              if (
                (moduleData.fieldType == "select" ||
                  moduleData.fieldType == "checkbox" ||
                  moduleData.fieldType == "radio" ||
                  moduleData.advanced_type == "slider" ||
                  moduleData.advanced_type == "multi_select" ||
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

  return {
    moduleList,
    selectedIndex,
    setSelectedIndex,
    updateValue,
  };
};

export default useFormLogic;
