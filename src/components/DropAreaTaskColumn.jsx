import React, { useState } from "react";
import "../styles/DropAreaTaskColumn.css";

const DropAreaTaskColumn = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={showDrop ? "drop_area" : "hide_drop"}>
      Drop Here
    </section>
  );
};

export default DropAreaTaskColumn;
