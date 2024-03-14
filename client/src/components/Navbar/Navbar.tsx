import styles from "./Navbar.module.css";
function Navbar() {
  return (
    <nav className={styles.nav}>
      <h1>LOGO</h1>
      <div className={styles.navLinks}>
        <ul className={styles.navLists}>
          <li>
            <a href="">Notes</a>
          </li>
          <li>
            <a href="">Login</a>
          </li>
          <li>
            <a href="">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
