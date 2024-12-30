import React from "react";

const SocialLinks = ({ links }) => {
  return (
    <div style={styles.socialLinks}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          style={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={link.icon} alt={link.name} style={styles.icon} />
        </a>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
  icon: {
    width: "24px",
    height: "24px",
  },
};

export default SocialLinks;
