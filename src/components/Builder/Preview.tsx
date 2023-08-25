import { Button } from "@mui/material";

import { Wrapper } from "./Builder.styles";
import { Layout } from "./BuilderElements";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import useBuilder from "./Builder.hooks";

interface Props {
  activeMode: string;
  previewType: String;
}

export default function Preview(props: Props) {
  const {
    allowDrop,
    layuotDrop,
    layoutData,
    sectionDrag,
    handleDndDrop,
    activeSlide,
    themeSetting,
    changeActiveSlide,
    activeEndScreen,
    endScreenData,
    setEditEndScreen,
    handleEndScreen,
    bringInView,
  } = useBuilder();
  const { activeMode, previewType } = props;
  console.log("endScreenData", endScreenData);

  return (
    <>
      <Wrapper
        onDrop={layuotDrop}
        onDragOver={allowDrop}
        {...themeSetting}
        className={`${activeMode} ${previewType} `}
        style={{
          backgroundColor: themeSetting.background,
          backgroundImage: "url(" + themeSetting.bgImage + ")",
        }}
      >
        <div className={`step-header `}>
          <div
            style={{
              width: `${
                layoutData.length > 6
                  ? "calc(100% - 165px)"
                  : "calc(100% - 54px)"
              }`,
            }}
            className="connecting-line"
          ></div>

          <ul>
            {layoutData.map((slide: any, index: number) => {
              return (
                <li
                  key={index}
                  style={{ width: `${100 / layoutData.length}%` }}
                  className={`${
                    activeSlide > index || activeEndScreen ? "completed" : ""
                  }
                  ${activeSlide == index && !activeEndScreen ? "active" : ""}
                  ${layoutData.length - 1 == index ? "last" : ""}
                  ${layoutData.length > 6 ? "free-width" : ""}
                  `}
                >
                  <p
                    style={{
                      color:
                        activeSlide === index
                          ? themeSetting.step_active__label_text_color
                          : themeSetting.step_label_text_color,
                    }}
                  >
                    {slide.slide_title}
                  </p>
                  <button
                    style={{
                      background:
                        activeSlide >= index
                          ? themeSetting.step_active_bg
                          : themeSetting.step_bg,
                      color:
                        activeSlide >= index
                          ? themeSetting.step_active_text_color
                          : themeSetting.step_text_color,
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}
            <li
              className={`${activeEndScreen ? "active" : ""}
              ${
                layoutData.length > 6
                  ? "free-width end-screen"
                  : "end-screen-step"
              }
              `}
            >
              <p
                style={{
                  color: themeSetting.step_label_text_color,
                }}
              >
                {endScreenData.slide_title}
              </p>
              <button
                style={{
                  background: activeEndScreen
                    ? themeSetting.step_active_bg
                    : themeSetting.step_bg,
                  color: activeEndScreen
                    ? themeSetting.step_active_text_color
                    : themeSetting.step_text_color,
                }}
              >
                {layoutData.length + 1}
              </button>
            </li>
          </ul>
        </div>
        <div className="step-form-content">
          {!activeEndScreen ? (
            <>
              {layoutData[activeSlide].data?.length === 0 && (
                <div className="droparea no-data">
                  <h4>Drop a Layout to start adding Module</h4>
                </div>
              )}
              {layoutData?.[activeSlide]?.data?.map(
                (section: any, index: number) => {
                  if (section?.type === "layout") {
                    return (
                      <Layout
                        columns={section.columns}
                        layoutIndex={index}
                        style={{
                          paddingLeft: section.paddingLeft,
                          paddingRight: section.paddingRight,
                          paddingTop: section.paddingTop,
                          paddingBottom: section.paddingBottom,
                          marginLeft: section.marginLeft,
                          marginRight: section.marginRight,
                          marginTop: section.marginTop,
                          marginBottom: section.marginBottom,
                          backgroundImage: `url(${section.bgImage})`,
                        }}
                        maxWidth={section.maxWidth}
                      />
                    );
                  }
                }
              )}
            </>
          ) : (
            <div
              className="end_screen_data"
              onClick={() => {
                setEditEndScreen(true);
              }}
            >
              {endScreenData?.content && (
                <div
                  className="rich_text editor-preview ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: JSON.parse(endScreenData?.content),
                  }}
                ></div>
              )}
            </div>
          )}
        </div>
      </Wrapper>
      {!activeEndScreen && (
        <div
          className={`form_footer ${activeMode}`}
          style={{ background: themeSetting.footeBg }}
        >
          {activeSlide > 0 && (
            <Button
              size="large"
              variant={"contained"}
              className="back_btn"
              onClick={() => {
                changeActiveSlide(activeSlide - 1);
              }}
              sx={{
                bgcolor: themeSetting.btnBgColor,
                color: themeSetting.btnTextColor,
                ":hover": {
                  bgcolor: themeSetting.btnHoveBgColor,
                  color: themeSetting.btnHoveColor,
                },
              }}
            >
              <ArrowBackIosIcon />
              {themeSetting.prevBtnText}
            </Button>
          )}

          {layoutData?.length - 1 === activeSlide ? (
            <Button
              size="large"
              variant={"contained"}
              className="next_btn"
              onClick={() => {
                handleEndScreen(true);
                bringInView();
              }}
              sx={{
                bgcolor: themeSetting.btnBgColor,
                color: themeSetting.btnTextColor,
                ":hover": {
                  bgcolor: themeSetting.btnHoveBgColor,
                  color: themeSetting.btnHoveColor,
                },
              }}
            >
              {themeSetting.submitBtnText} <ArrowForwardIosIcon />
            </Button>
          ) : (
            <Button
              size="large"
              variant={"contained"}
              className="next_btn"
              onClick={() => {
                changeActiveSlide(activeSlide + 1);
                bringInView();
              }}
              sx={{
                bgcolor: themeSetting.btnBgColor,
                color: themeSetting.btnTextColor,
                ":hover": {
                  bgcolor: themeSetting.btnHoveBgColor,
                  color: themeSetting.btnHoveColor,
                },
              }}
            >
              {themeSetting.nextBtnText} <ArrowForwardIosIcon />
            </Button>
          )}
        </div>
      )}
    </>
  );
}
