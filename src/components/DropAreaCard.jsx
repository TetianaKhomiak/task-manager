import React, { useState } from "react";
import "../styles/DropAreaCard.css";

const DropAreaCard = ({ onDrop }) => {
  const [showDropCard, setShowDropCard] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setShowDropCard(true);
  };

  const handleDragLeave = () => {
    setShowDropCard(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop();
    setShowDropCard(false);
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
      className={showDropCard ? "card__drop_area" : "card__hide_drop"}>
      Drop Here
    </section>
  );
};

export default DropAreaCard;
