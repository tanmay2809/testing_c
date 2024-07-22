import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";

type Section = "header" | "body" | "footer";

type SectionStyles = {
  color: string;
  bold: boolean;
  italic: boolean;
  underline:boolean;
  linethrough:boolean
};

type StylesState = {
  header: SectionStyles;
  body: SectionStyles;
  footer: SectionStyles;
};

type FormattingControlsProps = {
  content: string;
  section: Section;
  styles: StylesState;
  setStyles: React.Dispatch<React.SetStateAction<StylesState>>;
};

const FormattingControls: React.FC<FormattingControlsProps> = ({
  content,
  section,
  styles,
  setStyles,
}) => {
  const [showColorPicker, setShowColorPicker] = useState<Section | null>(null);

  const handleColorChange = (color: ColorResult) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [section]: { ...prevStyles[section], color: color.hex },
    }));
  };

  const toggleBold = () => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [section]: { ...prevStyles[section], bold: !prevStyles[section].bold },
    }));
  };

  const toggleItalic = () => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [section]: {
        ...prevStyles[section],
        italic: !prevStyles[section].italic,
      },
    }));
  };

  const toggleUnderline=()=>{
    setStyles((prevStyles) => ({
      ...prevStyles,
      [section]: {
        ...prevStyles[section],
        underline: !prevStyles[section].underline,
      },
    }));
  }

  const toggleLineThrough=()=>{
    setStyles((prevStyles) => ({
      ...prevStyles,
      [section]: {
        ...prevStyles[section],
        linethrough: !prevStyles[section].linethrough,
      },
    }));
  }

  return (
    <div className="flex items-center justify-between gap-2 mt-2 text-[#555555] text-sm">
      <span>Characters: {content.length} /{section==="header" && 100}{section==="body" && 1000}{section==="footer" && 200}</span>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() =>
            setShowColorPicker(showColorPicker === section ? null : section)
          }
          className="border rounded w-8 h-8"
          style={{ backgroundColor: styles[section].color }}
        ></button>
        {showColorPicker === section && (
          <div className={`absolute ${section==="header" && "z-10 top-[47rem]" } ${section==="body" && "z-10 top-[59.5rem]" } ${section==="footer" && "z-10 top-[72rem]" }`}>
            <SketchPicker
              color={styles[section].color}
              onChange={(color) => handleColorChange(color)}
            />
          </div>
        )}
        <button className="border rounded p-1">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 21.5C18.1421 21.5 21.5 18.1421 21.5 14C21.5 9.85786 18.1421 6.5 14 6.5C9.85786 6.5 6.5 9.85786 6.5 14C6.5 18.1421 9.85786 21.5 14 21.5Z"
              stroke="#454545"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.2466 15.875C16.9171 16.4449 16.4435 16.918 15.8734 17.247C15.3032 17.5759 14.6566 17.7491 13.9983 17.7491C13.3401 17.7491 12.6934 17.5759 12.1232 17.247C11.5531 16.9181 11.0795 16.4449 10.75 15.8751"
              stroke="#454545"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.1875 13.375C11.7053 13.375 12.125 12.9553 12.125 12.4375C12.125 11.9197 11.7053 11.5 11.1875 11.5C10.6697 11.5 10.25 11.9197 10.25 12.4375C10.25 12.9553 10.6697 13.375 11.1875 13.375Z"
              fill="#454545"
            />
            <path
              d="M16.8125 13.375C17.3303 13.375 17.75 12.9553 17.75 12.4375C17.75 11.9197 17.3303 11.5 16.8125 11.5C16.2947 11.5 15.875 11.9197 15.875 12.4375C15.875 12.9553 16.2947 13.375 16.8125 13.375Z"
              fill="#454545"
            />
          </svg>
        </button>
        <button className="border rounded p-1" onClick={toggleBold}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.4062 19.625H9.625V8.375H14.9375C15.5639 8.37504 16.1771 8.55435 16.7048 8.89174C17.2325 9.22914 17.6526 9.71052 17.9155 10.279C18.1784 10.8475 18.2731 11.4794 18.1884 12.1C18.1037 12.7206 17.8431 13.304 17.4375 13.7812C17.9673 14.205 18.3528 14.7825 18.5408 15.4344C18.7289 16.0862 18.7102 16.7803 18.4875 17.4211C18.2647 18.0619 17.8488 18.6179 17.297 19.0126C16.7452 19.4073 16.0847 19.6213 15.4062 19.625ZM11.5 17.75H15.3937C15.5784 17.75 15.7613 17.7136 15.9319 17.643C16.1025 17.5723 16.2575 17.4687 16.3881 17.3381C16.5187 17.2075 16.6223 17.0525 16.693 16.8819C16.7636 16.7113 16.8 16.5284 16.8 16.3438C16.8 16.1591 16.7636 15.9762 16.693 15.8056C16.6223 15.635 16.5187 15.48 16.3881 15.3494C16.2575 15.2188 16.1025 15.1152 15.9319 15.0445C15.7613 14.9739 15.5784 14.9375 15.3937 14.9375H11.5V17.75ZM11.5 13.0625H14.9375C15.1222 13.0625 15.305 13.0261 15.4756 12.9555C15.6463 12.8848 15.8013 12.7812 15.9319 12.6506C16.0625 12.52 16.166 12.365 16.2367 12.1944C16.3074 12.0238 16.3438 11.8409 16.3438 11.6562C16.3438 11.4716 16.3074 11.2887 16.2367 11.1181C16.166 10.9475 16.0625 10.7925 15.9319 10.6619C15.8013 10.5313 15.6463 10.4277 15.4756 10.357C15.305 10.2864 15.1222 10.25 14.9375 10.25H11.5V13.0625Z"
              fill="#212529"
            />
          </svg>
        </button>
        <button className="border rounded p-1" onClick={toggleItalic}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.625 9.625V8.375H11.5V9.625H14.7125L11.9813 18.375H8.375V19.625H16.5V18.375H13.2875L16.0187 9.625H19.625Z"
              fill="#212529"
            />
          </svg>
        </button>
        <button className="border rounded p-1" onClick={toggleUnderline}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 20.25H21.5V21.5H6.5V20.25ZM14 18.375C12.8397 18.375 11.7269 17.9141 10.9064 17.0936C10.0859 16.2731 9.625 15.1603 9.625 14V7.125H10.875V14C10.875 14.8288 11.2042 15.6237 11.7903 16.2097C12.3763 16.7958 13.1712 17.125 14 17.125C14.8288 17.125 15.6237 16.7958 16.2097 16.2097C16.7958 15.6237 17.125 14.8288 17.125 14V7.125H18.375V14C18.375 15.1603 17.9141 16.2731 17.0936 17.0936C16.2731 17.9141 15.1603 18.375 14 18.375Z"
              fill="#212529"
            />
          </svg>
        </button>
        <button className="border rounded p-1" onClick={toggleLineThrough}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 13.3754H15.2225C14.945 13.3008 14.6662 13.231 14.3863 13.166C12.6312 12.751 11.6388 12.4473 11.6388 11.0266C11.6245 10.7814 11.6608 10.5358 11.7454 10.3052C11.83 10.0746 11.9612 9.86384 12.1306 9.68601C12.6615 9.24944 13.3264 9.00889 14.0137 9.00476C15.7825 8.96101 16.5981 9.56101 17.265 10.4735L18.2744 9.73601C17.8019 9.05748 17.1578 8.51654 16.4078 8.16845C15.6578 7.82036 14.8288 7.6776 14.0056 7.75476C12.9944 7.76121 12.0189 8.12947 11.2556 8.79288C10.9663 9.08632 10.7402 9.4359 10.5913 9.82008C10.4423 10.2043 10.3736 10.6149 10.3894 11.0266C10.362 11.4772 10.4466 11.9275 10.6357 12.3374C10.8248 12.7472 11.1125 13.1039 11.4731 13.3754H6.5V14.6254H15.0325C16.2619 14.9816 16.9969 15.4454 17.0156 16.7241C17.0359 16.9973 16.9985 17.2717 16.9056 17.5294C16.8128 17.7871 16.6667 18.0223 16.4769 18.2198C15.8155 18.7411 14.9938 19.017 14.1519 19.0004C13.5234 18.9822 12.9074 18.8213 12.3503 18.5299C11.7932 18.2385 11.3097 17.8243 10.9362 17.3185L9.97812 18.121C10.4636 18.768 11.0899 19.2959 11.8097 19.6648C12.5295 20.0338 13.3238 20.234 14.1325 20.2504H14.195C15.3492 20.2636 16.4695 19.86 17.35 19.1135C17.6625 18.7984 17.9054 18.4213 18.0632 18.0065C18.2209 17.5917 18.2898 17.1485 18.2656 16.7054C18.289 15.9474 18.0332 15.2072 17.5469 14.6254H21.5V13.3754Z"
              fill="#212529"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FormattingControls;
