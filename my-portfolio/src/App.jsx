import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";
import arrow from "./assets/arrow.svg";

function App() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} alt="Hossam Logo" />
          <span className={styles.text}>11:26 PM CAIRO, EGYPT</span>
        </div>

        <div className={styles.spacer}></div>

        <div className={styles.title}>PERSONAL PORTFOLIO</div>

        <button className={styles.talk}>
          LET'S TALK NOW
          <img src={arrow} alt="Arrow" />
        </button>
      </header>
    </>
  );
}

export default App;
