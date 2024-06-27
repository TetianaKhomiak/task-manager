import React, { useState } from "react";
import "../styles/DropAreaTask.css";

const DropAreaTask = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setShowDrop(true);
  };

  const handleDragLeave = () => {
    setShowDrop(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop();
    setShowDrop(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={showDrop ? "card__drop_area" : "card__hide_drop"}>
      Drop Here
    </section>
  );
};

export default DropAreaTask;
