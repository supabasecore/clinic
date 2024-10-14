import React from "react";

export const DurationButton: React.FC<{
  weeks: number;
  onClick: () => void;
  isSelected: boolean;
}> = ({ weeks, onClick, isSelected }) => (
  <label className={isSelected ? "is-selected" : ""} onClick={onClick}>
    {weeks} sem
  </label>
);
