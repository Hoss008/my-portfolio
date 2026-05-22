import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";

function App() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} alt="Hossam Logo" />
          <span>11:26 PM CAIRO, EGYPT</span>
        </div>

        <div className={styles.spacer}></div>

        <div className={styles.title}>PERSONAL PORTFOLIO</div>

        <div className={styles.cta}>LET'S TALK NOW</div>
      </header>
    </>
  );
}

export default App;
