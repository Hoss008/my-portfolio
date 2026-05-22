import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";
import arrow from "./assets/arrow.svg";

function App() {
  return (
    <div className={styles.pageWrapper}>
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

      {/* This main tag will absorb the empty space in the middle */}
      <main className={styles.mainContent}></main>

      <footer className={styles.footer}>
        <p className={styles.p}>
          It’s Hossam ! <br />a front end developer & founder of NORQUE
          STUDIOS™. I build fast, polished interfaces — clean architecture,
          smooth animations, and pixel-perfect Figma handoffs.
        </p>
      </footer>

      <div className={styles.footerBottom}>
        <span className={styles.footerLink}>↘ LINKED IN</span>
        <span className={styles.footerLink}>↘ GITHUB</span>
        <span className={styles.footerLink}>↘ RESUME</span>
        <span className={styles.footerRights}>ALL RIGHTS RESERVED</span>
      </div>
    </div>
  );
}

export default App;
