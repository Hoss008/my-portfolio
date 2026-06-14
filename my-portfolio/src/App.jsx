import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";
import arrow from "./assets/arrow.svg";
import mail from "./assets/mail.svg";
import down from "./assets/down.svg";
import hoverSound from "./assets/zapsplatt.wav";
import resume from "./assets/Hossam Hassan.pdf";
import { motion, AnimatePresence } from "framer-motion";
import TextType from "../Animation";
import SplitText from "../Split";

function App() {
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState("");
  const audioRef = useRef(new Audio(hoverSound));

  const playHoverSound = useCallback(() => {
    const audio = audioRef.current;
    audio.volume = 0.2;
    audio.currentTime = 0;
    audio.play().catch((err) => console.log("Audio play failed:", err));
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

  useEffect(() => {
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 1600);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
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
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100dvh",
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "#ffffff",
                fontSize: "1.5rem",
                fontWeight: "500",
              }}
            >
              <TextType
                text={"Hello, World!"}
                variableSpeed={{
                  min: 40,
                  max: 100,
                }}
                deletingSpeed={30}
                pauseDuration={2500}
                showCursor={true}
                cursorCharacter="_"
                cursorBlinkDuration={0.8}
              />
            </motion.div>
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
          <motion.button
            onMouseEnter={playHoverSound}
            className={styles.talk}
            onClick={() =>
              (window.location.href = "mailto:hossamhassan2001.hh@gmail.com")
            }
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            GET IN TOUCH
            <motion.img
              src={mail}
              alt="Mail"
              variants={{
                hover: {
                  x: 4,
                  y: -2,
                  rotate: 5,
                },
              }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.button>
        </header>

        <main className={styles.mainContent}> </main>

        <footer className={styles.footer}>
          <div className={styles.p} style={{ textAlign: "left" }}>
            <SplitText
              tag="p"
              className={styles.p}
              splitType="words,lines"
              delay={25}
              duration={0.5}
              ease="cubic-bezier(1, 0, 0, 0.98)"
              from={{ opacity: 1, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
              startDelay={1.8}
              useScrollTrigger={true}
            >
              It's Hossam!
              <br />
              Frontend Developer & Co-Founder of NORQUE STUDIOS™.
             I build fast, polished interfaces with clean architecture,
              smooth animations, and maintainable code.
            </SplitText>
          </div>

          <div className={styles.brandsSection}>
            <h3 className={styles.brandsTitle}>projects I’ve Built</h3>
            <ul className={styles.brandsList}>
              <a
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
                href="https://norquestudios.com"
                target="_blank"
                rel="noopener noreferrer"
                onTouchStart={() => {}}
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
              </a>
              <a className={styles.brandItem} onMouseEnter={playHoverSound}>
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
              </a>
              <a
                href="https://github.com/Hoss008/clinicly-frontend"
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
              <a
                href="https://github.com/Hoss008/react-ecommerce-project"
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
              <a
                href="https://github.com/Hoss008/invoice-system-for-my-agency"
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            </ul>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerLinks}>
              <a
                className={`${styles.footerLink}`}
                onMouseEnter={playHoverSound}
                href="https://www.linkedin.com/in/hossam-hassan80/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={down} alt="Down" />
                <span className={styles.linkText}>LINKED IN</span>
              </a>
              <a
                className={`${styles.footerLink}`}
                onMouseEnter={playHoverSound}
                href="https://github.com/Hoss008"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={down} alt="Down" />
                <span className={styles.linkText}>GITHUB</span>
              </a>
              <a
                className={`${styles.footerLink}`}
                onMouseEnter={playHoverSound}
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={down} alt="Down" />
                <span className={styles.linkText}>RESUME</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
