import { DialogProps, Typography } from "@mui/material";
import CustomModal from "../CustomModal";
import { CopyBlock, dracula } from "react-code-blocks";
import { BoxWrapper } from "./EmbedBox.styles";

interface Props extends DialogProps {
  handleClose: any;
  open: boolean;
  formId: any;
}

export default function EmbedBox(props: Props) {
  const { handleClose, open, formId } = props;

  const CodeData = `
  {% require_js %}
  <script type="module" src="https://formmaker.co.in/embed/formaker.js">
  </script>
  {% end_require_js %}
  <div
      id="root"
      data-formid=${formId}
      data-type="demo"
      <!--  You can add your own font family here  -->
      data-font-family="Public Sans, sans-serif"
    ></div>
  {{ require_css("https://formmaker.co.in/embed/formaker.css") }}
`;

  return (
    <CustomModal open={open} handleClose={handleClose} width="850px">
      <Typography variant="h5" paddingBottom="10px">
        Copy and paste this code in your Hubspot custom module or website page
      </Typography>

      <BoxWrapper>
        <CopyBlock
          text={CodeData}
          language={"html"}
          showLineNumbers={true}
          theme={dracula}
        />
      </BoxWrapper>
    </CustomModal>
  );
}
