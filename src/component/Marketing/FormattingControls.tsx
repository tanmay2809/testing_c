import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";

//svg
import emoji from "/emoji.svg";
import italic from "/italic.svg";
import bold from "/bold.svg";

type Section = "header" | "body" | "footer";

type SectionStyles = {
  color: string;
  bold: boolean;
  italic: boolean;
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

  return (
    <div className="flex items-center justify-between gap-2 mt-2 text-[#555555] text-sm">
      <span>
        Characters: {content.length} /{section === "header" && 100}
        {section === "body" && 1000}
        {section === "footer" && 200}
      </span>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() =>
            setShowColorPicker(showColorPicker === section ? null : section)
          }
          className="border rounded w-8 h-8"
          style={{ backgroundColor: styles[section].color }}
        ></button>
        {showColorPicker === section && (
          <div
            className={`absolute ${
              section === "header" && "z-10 top-[47rem]"
            } ${section === "body" && "z-10 top-[59.5rem]"} ${
              section === "footer" && "z-10 top-[72rem]"
            }`}
          >
            <SketchPicker
              color={styles[section].color}
              onChange={(color) => handleColorChange(color)}
            />
          </div>
        )}
        <button className="border rounded p-1">
          <img src={emoji}/>
        </button>
        <button className="border rounded p-1" onClick={toggleBold}>
          <img src={bold}/>
        </button>
        <button className="border rounded p-1" onClick={toggleItalic}>
        <img src={italic}/>
        </button>
      </div>
    </div>
  );
};

export default FormattingControls;
