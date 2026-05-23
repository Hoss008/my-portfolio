import { useEffect, useState } from "react";
import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";
import arrow from "./assets/arrow.svg";
import down from "./assets/down.svg";

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatTime = (date) =>
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    const update = () => setTime(formatTime(new Date()));

    update();
    const intervalId = setInterval(update, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} alt="Hossam Logo" />
          <span className={styles.text}>{time} CAIRO, EGYPT</span>
        </div>

        <div className={styles.title}>PERSONAL PORTFOLIO</div>

        <button className={styles.talk}>
          LET'S TALK NOW
          <img src={arrow} alt="Arrow" />
        </button>
      </header>

      <main className={styles.mainContent}></main>

      <footer className={styles.footer}>
        <p className={styles.p}>
          It’s Hossam! <br />
          Front-End Developer & Founder of{" "}
          <a
            className={styles.inlineLink}
            href="https://norquestudios.com/"
            target="_blank"
            rel="noreferrer"
          >
            NORQUE STUDIOS™
          </a>
          . I build fast, polished interfaces with clean architecture, smooth
          animations, and maintainable code.
        </p>

        {/* Added Footer Bottom Links */}
        <div className={styles.footerBottom}>
          <div className={styles.footerLinks}>
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
          </div>
          {/* <span>ALL RIGHTS RESERVED</span> */}
        </div>
      </footer>
    </div>
  );
}

export default App;
