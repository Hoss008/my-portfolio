import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";
import arrow from "./assets/arrow.svg";
import down from "./assets/down.svg";
import hoverSound from "./assets/zapsplatt.wav";
import resume from "./assets/Hossam Hassan.pdf";

function App() {
  const [time, setTime] = useState("");
  const audioRef = useRef(new Audio(hoverSound));

  const playHoverSound = useCallback(() => {
    const audio = audioRef.current;
    audio.volume = 0.2;
    audio.currentTime = 0;
    audio.play().catch((err) => console.log("Audio play failed:", err));
    // Stop the sound after 200ms to make it shorter
    setTimeout(() => {
      audio.pause();
    }, 50);
  }, []);

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
              width="16"
              height="16"
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

        <button
          className={styles.talk}
          onClick={() =>
            (window.location.href = "mailto:hossamhassan2001.hh@gmail.com")
          }
        >
          GET IN TOUCH
          <img src={arrow} alt="Arrow" />
        </button>
      </header>

      <main className={styles.mainContent}>
        {" "}
        {/* TODO
        mail icon 
        loading screen ?</li>
        broswer tab icon ?</li> */}
      </main>

      <footer className={styles.footer}>
        <p className={styles.p}>
          It’s Hossam! <br />
          Frontend Developer & Co-Founder of{" "}
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

        <div className={styles.brandsSection}>
          <h3 className={styles.brandsTitle}>projects I’ve Built</h3>
          <ul className={styles.brandsList}>
            <li
              className={styles.brandItem}
              onMouseEnter={playHoverSound}
              onClick={() =>
                window.open("https://norquestudios.com", "_blank")
              }
            >
              <span>NORQUE STUDIOS™</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li className={styles.brandItem} onMouseEnter={playHoverSound}>
              <span>Fusion Form®</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li className={styles.brandItem} onMouseEnter={playHoverSound}>
              <span>Moud™</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
          </ul>
        </div>

        {/* Added Footer Bottom Links */}
        <div className={styles.footerBottom}>
          <div className={styles.footerLinks}>
            <a
              className={styles.footerLink}
              href="https://www.linkedin.com/in/hossam-hassan80/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={down} alt="Down" />
              LINKED IN
            </a>
            <a
              className={styles.footerLink}
              href="https://github.com/Hoss008"
              target="_blank"
              rel="noreferrer"
            >
              <img src={down} alt="Down" />
              GITHUB
            </a>
            <a
              className={styles.footerLink}
              href={resume}
              target="_blank"
              rel="noreferrer"
            >
              <img src={down} alt="Down" />
              RESUME
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
