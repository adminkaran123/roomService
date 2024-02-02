import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { CustomWebCamWrapper } from "./CustomWebcam.styles";

const CustomWebcam: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [mirrored, setMirrored] = useState(false);

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <CustomWebCamWrapper>
      <div className="inner-wrapper">
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (
          <Webcam
            height={400}
            width={600}
            ref={webcamRef}
            mirrored={mirrored}
          />
        )}
        <div className="btn-container">
          {imgSrc ? (
            <button className="photo-button" onClick={retake}>
              Retake photo
            </button>
          ) : (
            <button className="photo-button" onClick={capture}>
              <div className="circle"></div>
              <div className="ring"></div>
            </button>
          )}
        </div>
      </div>
    </CustomWebCamWrapper>
  );
};

export default CustomWebcam;
