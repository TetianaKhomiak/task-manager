import React from "react";

const DropdownMenuItem = ({
  className,
  disabled,
  onClick,
  style,
  children,
}) => {
  return (
    <div
      className={className}
      disabled={disabled}
      onClick={onClick}
      style={style}>
      {children}
    </div>
  );
};

export default DropdownMenuItem;
