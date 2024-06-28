import React from "react";

const DropdownMenuItem = ({
  className,
  disabled,
  onClick,
  style,
  children,
}) => {
  return (
    <div>
      <button
        type="button"
        className={className}
        disabled={disabled}
        onClick={onClick}
        style={style}>
        {children}
      </button>
    </div>
  );
};

export default DropdownMenuItem;
