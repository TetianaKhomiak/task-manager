import React, { useState } from "react";
import "../styles/DropAreaColumn.css";

const DropAreaColumn = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={showDrop ? "column__drop_area" : "column__hide_drop"}>
      "Drop Here"
    </section>
  );
};

export default DropAreaColumn;
