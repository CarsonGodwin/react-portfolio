import React from "react";

const Card = ({ title, description, image, link }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={link} style={styles.link}>
          View
        </a>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  link: {
    textDecoration: "none",
    color: "blue",
  },
};

export default Card;
