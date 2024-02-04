import Webcam from "react-webcam";
import { useCallback, useRef, useState, useEffect } from "react";
import { CustomWebCamWrapper } from "./CustomWebcam.styles";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";

interface WebcamProps {
  setImgSrc: Function;
  imgSrc: string | null;
  setCameraOpen: Function;
}

const CustomWebcam = (props: WebcamProps) => {
  const { setImgSrc, imgSrc, setCameraOpen } = props;
  const webcamRef = useRef<Webcam>(null);
  const [mirrored, setMirrored] = useState(false);
  const [videoDevices, setVideoDevices] = useState<any>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(null);

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  // Fetch available video devices
  const getVideoDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoDevices(videoDevices);
      //@ts-ignore
      setSelectedVideoDevice(videoDevices[0]); // Set the first device as the default
    } catch (error) {
      console.error("Error getting video devices:", error);
    }
  };

  // Switch camera handler
  const switchCamera = () => {
    const currentIndex = videoDevices.findIndex(
      (device: any) => device === selectedVideoDevice
    );
    const nextIndex = (currentIndex + 1) % videoDevices.length;
    setSelectedVideoDevice(videoDevices[nextIndex]);
  };

  useEffect(() => {
    getVideoDevices();
  }, []);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <CustomWebCamWrapper>
      <div className="inner-wrapper">
        {imgSrc ? (
          <img className="clicked_image" src={imgSrc} alt="webcam" />
        ) : (
          <Webcam
            height={600}
            width={600}
            ref={webcamRef}
            mirrored={mirrored}
          />
        )}
        <div className="btn-container">
          {imgSrc ? (
            <>
              <button className="retake_btn" onClick={retake}>
                <ClearIcon />
                <span>Retake</span>
              </button>
              <button
                className="done_btn"
                onClick={() => {
                  setCameraOpen(false);
                }}
              >
                <CheckIcon />
                <span>Done</span>
              </button>
            </>
          ) : (
            <>
              <button className="photo-button" onClick={capture}>
                <div className="circle"></div>
                <div className="ring"></div>
              </button>
              {videoDevices.length > 1 && (
                <button className="switch_camera" onClick={switchCamera}>
                  <CameraswitchIcon />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </CustomWebCamWrapper>
  );
};

export default CustomWebcam;
