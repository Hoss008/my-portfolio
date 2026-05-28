import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";
import arrow from "./assets/arrow.svg";
import down from "./assets/down.svg";
import hoverSound from "./assets/zapsplatt.wav";
import resume from "./assets/Hossam Hassan.pdf";
import { motion, AnimatePresence } from "framer-motion";

{
  /* TODO
          mail icon 
          broswer tab icon ?</li> */
}

function App() {
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  // 1. ADDED: Global loading state
  const [isLoading, setIsLoading] = useState(true);
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

  const unlockAudio = useCallback(() => {
    if (audioUnlocked) return;
    const audio = audioRef.current;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.2;
        setAudioUnlocked(true);
      })
      .catch(() => {});
  }, [audioUnlocked]);

  // 2. ADDED: Initial Load Effect
  useEffect(() => {
    const handleComplete = () => {
      // 800ms delay ensures the loader doesn't violently flash on fast connections
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
  }, []);

  // Existing Time Effect
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
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            // 1. The "Curtain Pull": Slides the entire black screen up and away
            exit={{ y: "-100vh", opacity: 0 }}
            // 2. The Golden Curve: A signature easing bezier used in high-end UI
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <motion.img
              src={logo}
              alt="Hossam Logo"
              // 3. Photographic Entrance: Adds a subtle blur that snaps into focus
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              // 4. Parallax Exit: The logo sinks back and blurs out just before the curtain pulls up
              exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

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

        <main className={styles.mainContent}> </main>

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
                <span>Norque Studios™</span>
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
              {/* <li className={styles.brandItem} onMouseEnter={playHoverSound}>
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
              </li> */}
              <li
                onClick={() =>
                  window.open(
                    "https://github.com/Hoss008/clinicly-frontend",
                    "_blank",
                  )
                }
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
              >
                <span>Clinicly Web</span>
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
              <li
                onClick={() =>
                  window.open(
                    "https://github.com/Hoss008/react-ecommerce-project",
                    "_blank",
                  )
                }
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
              >
                <span>React E-Commerce</span>
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
              <li
                onClick={() =>
                  window.open(
                    "https://github.com/Hoss008/invoice-system-for-my-agency",
                    "_blank",
                  )
                }
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
              >
                <span>Invoicing SaaS</span>
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
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
                className={styles.footerLink}
                href="https://www.linkedin.com/in/hossam-hassan80/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={down} alt="Down" />
                LINKED IN
              </a>
              <a
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
                className={styles.footerLink}
                href="https://github.com/Hoss008"
                target="_blank"
                rel="noreferrer"
              >
                <img src={down} alt="Down" />
                GITHUB
              </a>
              <a
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
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
    </>
  );
}

export default App;
