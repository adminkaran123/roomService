import React, { useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapeWebPage from "grapesjs-preset-webpage";

import grapeBasic from "grapesjs-blocks-basic";
import gjsForms from "grapesjs-plugin-forms";

import { Container } from "./LayoutBuilder.styles";

import grapesjs from "grapesjs";

const LayoutBuilder = () => {
  useEffect(() => {
    var editor = grapesjs.init({
      container: "#gjs",
      canvas: {
        styles: [
          "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
        ],
      },
      plugins: [
        (editor) =>
          grapeBasic(editor, {
            blocks: [
              "column1",
              "column2",
              "column3",
              "column3-7",
              "text",
              "link",
              "image",
            ],
          }),
        (editor) => grapeWebPage(editor, {}),
        (editor) =>
          gjsForms(editor, {
            blocks: [
              "input",
              "textarea",
              "select",
              "button",
              "label",
              "checkbox",
              "radio",
            ],
          }),
      ],
    });
    editor.BlockManager;
  }, []);
  return (
    <Container>
      <div id="gjs"></div>
    </Container>
  );
};

export default LayoutBuilder;
