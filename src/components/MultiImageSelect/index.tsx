import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { StyledImage, OptionsWrapper } from "./MultiImageSelect.styles";
import ImageIcon from "@mui/icons-material/Image";

// Sample image URLs
const sampleImageUrls = [
  "image_url_1.jpg",
  "image_url_2.jpg",
  "image_url_3.jpg",
];

interface Props {
  options: any[];
  name: string;
}

function MultiImageSelect(props: Props) {
  const { options, name } = props;
  const [checkedItems, setCheckedItems] = React.useState(
    new Array(sampleImageUrls.length).fill(false)
  );

  const handleChange = (index) => (event) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };

  return (
    <OptionsWrapper>
      <ul>
        {options?.map((option: any, index) => (
          <li key={`item_${name + index}`}>
            <input type="checkbox" id={`item_${name + index}`} name={name} />
            <label htmlFor={`item_${name + index}`}>
              {option.image ? (
                <img src={option.image} />
              ) : (
                <div className="image-box">
                  <ImageIcon />
                </div>
              )}

              <p>{option.title}</p>
            </label>
          </li>
        ))}
        {!Boolean(options) && (
          <li>
            <label htmlFor={`add_item`}>
              <div className="image-box">
                <ImageIcon />
              </div>
              <p>Add Image Options</p>
            </label>
          </li>
        )}
      </ul>
    </OptionsWrapper>
  );
}

export default MultiImageSelect;
