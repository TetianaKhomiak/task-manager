import React from "react";

const DropdownMenuItem = ({
  className,
  disabled,
  onClick,
  style,
  children,
}) => {
  return (
    <div className="dropdown-menu__item">
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
