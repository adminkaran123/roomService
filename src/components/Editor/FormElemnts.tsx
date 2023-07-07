import { EditorBlock } from "draft-js";
import { TextField, TextareaAutosize, styled } from "@mui/material/";
export const EditorTextfield = () => {
  return (
    <div className="form-input">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export const EditorTextArea = () => {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[700] : grey[200]
        };
        box-shadow: 0px 2px 24px ${
          theme.palette.mode === "dark" ? blue[900] : blue[100]
        };
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
            theme.palette.mode === "dark" ? blue[600] : blue[200]
          };
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );
  return <StyledTextarea aria-label="empty textarea" placeholder="Empty" />;
};

const Component = (props) => {
  return (
    <div
      style={{
        border: "1px solid #003366",
        backgroundColor: "#EFEFEF",
        width: "100%",
        height: "120px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", width: "100%", margin: "10px" }}
        contentEditable={false}
      >
        <button>Custom Octopus Script Component</button>
        <button>Custom Octopus Script Component</button>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "auto",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "1px solid #f00",
            width: "80%",
            display: "flex",
            alignSelf: "center",
          }}
        >
          <EditorBlock {...props} />
        </div>
      </div>
    </div>
  );
};