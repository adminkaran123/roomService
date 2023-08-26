import React, { useState } from "react";
import { Rating as MuiRating } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import PropTypes from "prop-types";

interface RatingProps {
  onChange: (value: number) => void;
  defaultValue?: number;
  module: any;
}

const customIcons: any = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

const Rating: React.FC<RatingProps> = ({
  onChange,
  defaultValue = 0,
  module,
}) => {
  const [value, setValue] = useState<number>(defaultValue);
  const {
    iconSize = 50,
    ratingCount = 5,
    ratingIconColor = "#9b9b9b",
    ratingIconFilledColor = "#ffb400",
    iconType = "star",
  } = module;

  const handleRatingChange = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
      onChange(newValue);
    }
  };
  // function IconContainer(props) {
  //   const { value, ...other } = props;
  //   return (
  //     <span {...other} className="sentiment_icon">
  //       {customIcons[value].icon}
  //     </span>
  //   );
  // }

  // if (iconType == "sentiment") {
  //   return (
  //     <MuiRating
  //       name="customized-icons"
  //       defaultValue={2}
  //       value={value}
  //       getLabelText={(value) => customIcons[value].label}
  //       IconContainerComponent={IconContainer}
  //       onChange={(event, newValue) => handleRatingChange(newValue)}
  //     />
  //   );
  // }

  return (
    <MuiRating
      name="rating"
      value={value}
      onChange={(event, newValue) => handleRatingChange(newValue)}
      precision={0.5}
      max={ratingCount}
      size="large"
      emptyIcon={
        iconType == "star" ? (
          <StarBorderIcon
            style={{
              width: iconSize + "px",
              height: iconSize + "px",
              fill: ratingIconColor,
            }}
          />
        ) : (
          <FavoriteBorderIcon
            style={{
              width: iconSize + "px",
              height: iconSize + "px",
              fill: ratingIconColor,
            }}
          />
        )
      }
      icon={
        iconType == "star" ? (
          <StarIcon
            style={{
              width: iconSize + "px",
              height: iconSize + "px",
              fill: ratingIconFilledColor,
            }}
          />
        ) : (
          <FavoriteIcon
            style={{
              width: iconSize + "px",
              height: iconSize + "px",
              fill: ratingIconFilledColor,
            }}
          />
        )
      }
    />
  );
};

export default Rating;
