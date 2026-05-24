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
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

    const update = () => setTime(formatTime(new Date()));

    update();
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logo} alt="Hossam Logo" />
          <span className={styles.text}>{time} CAI, EGYPT</span>
        </div>

        <div className={styles.title}>PERSONAL PORTFOLIO</div>

        <button className={styles.talk}>
            GET IN TOUCH
          <img src={arrow} alt="Arrow" />
        </button>
      </header>

      <main className={styles.mainContent}>
        {" "}
        TODO
        <li>skills</li>
        <li>lets talk button ? mail & phone number ?</li>
      </main>

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
