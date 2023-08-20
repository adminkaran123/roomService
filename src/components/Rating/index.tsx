import React, { useState } from "react";
import { Rating as MuiRating } from "@mui/material";

interface RatingProps {
  onChange: (value: number) => void;
  defaultValue?: number;
}

const Rating: React.FC<RatingProps> = ({ onChange, defaultValue = 0 }) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleRatingChange = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <MuiRating
      name="rating"
      value={value}
      onChange={(event, newValue) => handleRatingChange(newValue)}
      precision={1}
      max={10}
    />
  );
};

export default Rating;
