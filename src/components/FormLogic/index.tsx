import React from "react";
import {
  Select,
  MenuItem,
  Stack,
  Card,
  Button,
  CardContent,
  InputLabel,
  IconButton,
  FormControl,
  Divider,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { Wrapper } from "./FormLogic.styles";
import SelectWithLabel from "../textfields/selectWithLabel/SelectWithLabeL";
import IconSvg from "../Icon/IconSvg";
import { ADD_ICON } from "../../utils/constants/svgContstants";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

export default function FormLogic() {
  return (
    <Wrapper>
      <Card>
        <CardContent className="logic_box">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Forms Logic</Typography>
            <Button
              startIcon={<IconSvg icon={ADD_ICON} />}
              size="large"
              variant="contained"
              //onClick={onAddNew}
              style={{ color: "#fff" }}
            >
              Add Logic
            </Button>
          </Stack>

          <Card className="custom_box">
            <Stack spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Condition</Typography>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button
                    style={{
                      color: "#2c2c2c",
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    style={{
                      color: "rgb(239, 83, 80)",
                    }}
                  >
                    <Delete />
                  </Button>
                </ButtonGroup>
              </Stack>
              <Divider />
              <Stack>
                <Typography>if</Typography>
                <Typography>test value</Typography>
                <Typography>empty</Typography>
              </Stack>
            </Stack>
          </Card>

          <Card className="custom_box">
            <Stack spacing={1} marginTop={"10px"}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Condition</Typography>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button>Or </Button>
                  <Button>And</Button>
                </ButtonGroup>
              </Stack>
              <Divider />
              <Stack marginTop="20px" direction="row" alignItems="center">
                <Typography variant="h6" paddingRight="10px">
                  If
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id={"name"}>Select Input</InputLabel>
                  <Select
                    labelId={"name"}
                    //value={age}
                    label="Select Input"
                    variant="outlined"
                    ///onChange={handleChange}
                  >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <Button variant="contained" className="add_btn">
                  <AddIcon />
                </Button>
              </Stack>
            </Stack>
          </Card>

          <Card className="custom_box">
            <Stack spacing={1} marginTop={"10px"}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Then</Typography>
              </Stack>
              <Divider />
              <Stack
                marginTop="20px"
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <FormControl style={{ width: "150px" }}>
                  <Select
                    //value={age}

                    variant="outlined"
                    value="show"

                    ///onChange={handleChange}
                  >
                    <MenuItem value="show">Show</MenuItem>
                    <MenuItem value="hide">Hide</MenuItem>
                    <MenuItem value="go">Go</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id={"name"}>Select Input</InputLabel>
                  <Select
                    labelId={"name"}
                    //value={age}
                    label="Select Input"
                    variant="outlined"
                    ///onChange={handleChange}
                  >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Card>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button variant="contained" size="large">
              Save
            </Button>
            <Button variant="outlined" size="large">
              Cancel
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
