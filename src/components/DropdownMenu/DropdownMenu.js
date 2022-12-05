import styles from "./DropdownMenu.module.scss";

const DropdownMenu = ({ setShowDropdown, children, className }) => {
  return (
    <div
      className={`${styles.wrapper} ${className ? className : ""}`}
      onMouseOver={() => setShowDropdown(true)}
      onMouseOut={() => setShowDropdown(false)}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
