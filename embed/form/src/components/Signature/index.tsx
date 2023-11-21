import React, { useRef, useEffect } from "react";
//@ts-ignore
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = () => {
  const signatureRef = useRef();

  useEffect(() => {
    // Get the canvas element from the ref
    const canvas =
      //@ts-ignore
      signatureRef.current.getCanvas();

    // Draw the default signature
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "18px Verdana";
    ctx.fillText("Default Signature", canvas.width / 2, canvas.height / 2);
  }, []);

  return (
    <div>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ width: 400, height: 200, className: "signature" }}
      />
    </div>
  );
};

export default SignaturePad;
