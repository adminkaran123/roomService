import { TextField, ButtonGroup, Button } from "@mui/material";
import { Wrapper } from "./PaddingMarginSetting styles";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import usePaddingMarginSetting from "./PaddingMarginSetting.hooks";
interface Props {
  data: any;
  handleLayoutProperty: Function;
}

const PaddingMarginSetting = (props: Props) => {
  const { data, handleLayoutProperty } = props;
  const { setActiveTab, activeTab } = usePaddingMarginSetting();
  console.log("data", data);

  return (
    <Wrapper alignItems="center" direction="column">
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          variant={activeTab === "padding" ? "contained" : "outlined"}
          onClick={() => {
            setActiveTab("padding");
          }}
        >
          Padding
        </Button>
        <Button
          variant={activeTab === "margin" ? "contained" : "outlined"}
          onClick={() => {
            setActiveTab("margin");
          }}
        >
          Margin
        </Button>
      </ButtonGroup>
      {activeTab === "margin" ? (
        <>
          <TextField
            type="number"
            onChange={(e) => {
              handleLayoutProperty(
                "marginTop",
                //@ts-ignore
                Number(e.target.value)
              );
            }}
            value={String(data?.marginTop)}
            className="top"
          />
          <BorderAllIcon className="center" />
          <TextField
            type="number"
            className="left"
            onChange={(e) => {
              handleLayoutProperty(
                "marginLeft",
                //@ts-ignore
                Number(e.target.value)
              );
            }}
            value={String(data?.marginLeft)}
          />
          <TextField
            type="number"
            className="right"
            onChange={(e) => {
              handleLayoutProperty(
                "marginRight",
                //@ts-ignore
                Number(e.target.value)
              );
            }}
            value={String(data?.marginRight)}
          />
          <TextField
            type="number"
            className="bottom"
            onChange={(e) => {
              handleLayoutProperty(
                "marginBottom",
                //@ts-ignore
                Number(e.target.value)
              );
            }}
            value={String(data?.marginBottom)}
          />
        </>
      ) : (
        <>
          <TextField
            type="number"
            className="top"
            onChange={(e) => {
              handleLayoutProperty(
                "paddingTop",
                //@ts-ignore
                Number(e.target.value)
              );
            }}
            value={String(data?.paddingTop)}
            inputProps={{ min: 0 }}
          />
          <BorderAllIcon className="center" />
          <TextField
            type="number"
            className="left"
            onChange={(e) => {
              handleLayoutProperty(
                "paddingLeft",
                //@ts-ignore
                Number(e.target.value)
              );
            }}
            value={String(data?.paddingLeft)}
            inputProps={{ min: 0 }}
          />
          <TextField
            type="number"
            className="right"
            onChange={(e) => {
              handleLayoutProperty(
                "paddingRight",
                //@ts-ignore
                Number(e.target.value)
              );
            }}
            value={String(data?.paddingRight)}
            inputProps={{ min: 0 }}
          />
          <TextField
            type="number"
            className="bottom"
            onChange={(e) => {
              handleLayoutProperty(
                "paddingBottom",
                //@ts-ignore
                Number(e.target.value)
              );
            }}
            value={String(data?.paddingBottom)}
            inputProps={{ min: 0 }}
          />
        </>
      )}
    </Wrapper>
  );
};

export default PaddingMarginSetting;
