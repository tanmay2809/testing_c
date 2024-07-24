import React from "react";

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
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [section]: { ...prevStyles[section], color: event.target.value },
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
        <input
          className="text-center w-9 border-gray cursor-pointer border-slate-800 h-[2.5rem]"
          type="color"
          value={styles[section].color}
          onChange={handleColorChange}
        />
        <div
          className="color-display border-gray"
          style={{ backgroundColor: styles[section].color }}
        ></div>
        <button className="border rounded p-1">
          <img src={emoji} />
        </button>
        <button className="border rounded p-1" onClick={toggleBold}>
          <img src={bold} />
        </button>
        <button className="border rounded p-1" onClick={toggleItalic}>
          <img src={italic} />
        </button>
      </div>
    </div>
  );
};

export default FormattingControls;
