import { useState } from "react";

import { proprtyDummyData } from "../../utils/constants/constants";

const usePropertiesModal = () => {
  const proprties = proprtyDummyData;
  return {
    proprties,
  };
};

export default usePropertiesModal;
