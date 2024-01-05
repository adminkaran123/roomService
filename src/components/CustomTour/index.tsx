import React from "react";
//@ts-ignore
import Tour from "reactour";

interface Props {
  steps: any;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function CustomTour(props: Props) {
  const { steps, isOpen, onRequestClose } = props;
  return (
    <Tour
      steps={steps}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      showArrow={false}
      rounded={5}
    />
  );
}
