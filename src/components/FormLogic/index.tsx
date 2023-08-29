import React from "react";
import {
  Select,
  MenuItem,
  Stack,
  Card,
  Button,
  CardContent,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Wrapper } from "./FormLogic.styles";
import SelectWithLabel from "../textfields/selectWithLabel/SelectWithLabeL";

export default function FormLogic() {
  return (
    <Wrapper>
      <Card>
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id={module.name}>{module.label}</InputLabel>
            {/* <Select
              labelId={"label"}
              //value={age}
              label="Slec"
              variant={themeSetting.type}
              //onChange={handleChange}
            >
              {module.options.map((item: any) => {
                return <MenuItem value={item.value}>{item.label}</MenuItem>;
              })}
            </Select> */}
          </FormControl>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
