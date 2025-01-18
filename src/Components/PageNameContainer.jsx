import { NavLink, useLocation } from "react-router-dom";
import styles from './PageNameContainer.module.css';

export default function PageNameContainer({ src, name }) {
  const location = useLocation();
  const isActive = location.pathname === `/${name}`; // Determine active state based on location

  const imgStyles = {
    width: "20px", height: "20px"
  };

  return (
    <NavLink
      to={`/${name}`}
      className={`${styles.navLink} nav-link d-flex align-items-center text-dark py-2 my-3 pe-4 ${isActive ? styles.active : ''}`}
      style={{ position: "relative" }}
    >
      {isActive && (
        <img
          src="/icons/pink-rectangle.png"
          style={{
            maxHeight: "30px",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: -1,
          }}
          alt="background decoration"
        />
      )}

      <img
        src={`${src}${isActive ? '-active' : ''}.png`}
        alt={`${name} ${isActive ? 'active ' : ''}icon`}
        className="mx-4"
        style={imgStyles}
      />
      <span style={{ color: isActive ? '#10898F' : '' }}>{name}</span>
    </NavLink>
  );
}
