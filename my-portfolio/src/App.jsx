import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";
import arrow from "./assets/arrow.svg";
import down from "./assets/down.svg";

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

      <main className={styles.mainContent}></main>

      <footer className={styles.footer}>
        <p className={styles.p}>
          It’s Hossam Hassan! <br/>A react developer & founder of NORQUE STUDIOS™. I
          build fast, polished interfaces — clean architecture, smooth
          animations, and pixel-perfect Figma handoffs.
        </p>

        {/* Added Footer Bottom Links */}
        <div className={styles.footerBottom}>
          <span className={styles.footerLink}>
            <img src={down} alt="Down" />
            LINKED IN
          </span>
          <span className={styles.footerLink}>
            <img src={down} alt="Down" />
            GITHUB
          </span>
          <span className={styles.footerLink}>
            <img src={down} alt="Down" />
            RESUME
          </span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
