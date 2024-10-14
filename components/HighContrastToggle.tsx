import React, { useState, useEffect } from "react";

interface HighContrastToggleProps {
  onChange: (isChecked: boolean) => void;
  name: string;
}

const HighContrastToggle: React.FC<HighContrastToggleProps> = ({
  onChange,
  name,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={"flex--item s-toggle-switch"}>
      <input
        type="checkbox"
        id={`highcontrast-toggle-${name}`}
        className="js-highcontrast-toggle"
        name={name}
        checked={isChecked}
        onChange={handleToggleChange}
      />
      <div className="s-toggle-switch--indicator"></div>
    </div>
  );
};

export default HighContrastToggle;
