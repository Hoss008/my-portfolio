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
          <div className={styles.locationGroup}>
            <span className={styles.text}>{time} CAI, EGYPT</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="20"
              height="20"
              fill="#888888"
              style={{ flexShrink: 0 }}
            >
              <g weight="regular">
                <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
              </g>
            </svg>
          </div>
        </div>

        <div className={styles.title}>PERSONAL PORTFOLIO</div>

        <button className={styles.talk}>
          GET IN TOUCH
          <img src={arrow} alt="Arrow" />
        </button>
      </header>

      <main className={styles.mainContent}>
        {" "}
        {/* TODO
        <li>skills</li>
        loading screen ?</li>
        <li>lets talk button ? mail & phone number ?</li> */}
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
