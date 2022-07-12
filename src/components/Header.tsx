import styles from "./Header.module.css";
import toDoLogo from "../images/Logo.svg";

export function Header() {
  return (
    <section>
      <header className={styles.header}>
        <img src={toDoLogo} alt="Logotipo do toDo" />
      </header>
    </section>
  );
}
