import { useState } from "react";

const useFormBuilder = () => {
  const [color, setColor] = useState("rgba(255,255,255,1)");

  return {
    color,
    setColor,
  };
};

export default useFormBuilder;
