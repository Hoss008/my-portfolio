import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./app.module.css";
import logo from "./assets/Hossam Logo 1.svg";
import arrow from "./assets/arrow.svg";
import mail from "./assets/mail.svg";
import down from "./assets/down.svg";
import hoverSound from "./assets/zapsplatt.wav";
import resume from "./assets/Hossam'sCV.pdf";
import { motion, AnimatePresence } from "framer-motion";
import TextType from "../Animation";
import SplitText from "../Split";
import * as Sentry from "@sentry/react";

function App() {
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState("");
  const audioRef = useRef(new Audio(hoverSound));

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.background = `radial-gradient(
    circle at ${x}px ${y}px, 
    rgba(255, 255, 255, 0.06), 
    #0A0A0A 40%
  )`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.background = "#0A0A0A";
  };

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
              Frontend Developer & Co-Founder of NORQUE STUDIOS™. I've delivered
              production-ready websites and React applications for businesses.
            </SplitText>
          </div>
          <button
            onClick={() => {
              Sentry.captureException(new Error("Sentry test error"));
            }}
          >
            Test Sentry
          </button>
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
              <a
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
                href="https://www.fusionformad.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
              >
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
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
                href="https://amk-sol.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.brandItem}
                onMouseEnter={playHoverSound}
              >
                <span>Makh Horizon</span>
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
                <span className={styles.linkText}>LINKEDIN</span>
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
              {/* --- NEW SKILLS SECTION --- */}
              <div className={styles.skillsWrapper}>
                <div
                  className={`${styles.footerLink} ${styles.skillsTrigger}`}
                  onMouseEnter={playHoverSound}
                >
                  <img src={down} alt="Down" />
                  <span className={styles.linkText}>SKILLS</span>
                </div>

                <div
                  className={styles.skillsCard}
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={styles.skillsSection}>
                    <span className={styles.sectionTitle}>Core Frontend</span>
                    <ul className={styles.skillsList}>
                      <li>
                        <svg
                          viewBox="-11.5 -10.23174 23 20.46348"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                          <g stroke="currentColor" strokeWidth="1">
                            <ellipse rx="11" ry="4.2" />
                            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                          </g>
                        </svg>
                        <span>React</span>
                      </li>
                      <li>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0H24V24H0V0ZM18.3467 20.1196C17.2343 20.1196 16.6053 19.5394 16.1219 18.7501L14.2891 19.8149C14.9512 21.123 16.3044 22.1211 18.3989 22.1211C20.5409 22.1211 22.136 21.0088 22.136 18.9783C22.136 17.0949 21.0541 16.2571 19.1379 15.4354L18.5741 15.1939C17.6065 14.7749 17.1874 14.501 17.1874 13.8244C17.1874 13.277 17.6061 12.8579 18.2667 12.8579C18.9143 12.8579 19.3314 13.131 19.7181 13.8244L21.4743 12.6968C20.7314 11.3901 19.7006 10.891 18.2667 10.891C16.2526 10.891 14.9638 12.1787 14.9638 13.8701C14.9638 15.7063 16.0449 16.5749 17.6724 17.2682L18.2362 17.5101C19.2648 17.96 19.8781 18.2339 19.8781 19.0072C19.8781 19.6526 19.2811 20.1196 18.3467 20.1196ZM9.60647 20.1055C8.83161 20.1055 8.50933 19.5741 8.15504 18.9455L6.31923 20.057C6.85104 21.1825 7.89676 22.117 9.70247 22.117C11.7009 22.117 13.0701 21.0541 13.0701 18.7189V11.0198H10.8149V18.6884C10.8149 19.8156 10.3474 20.1055 9.60647 20.1055Z"
                              fill="#818589"
                            ></path>{" "}
                          </g>
                        </svg>
                        <span>JavaScript</span>
                      </li>

                      <li>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                        <span>Zustand</span>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.skillsSection}>
                    <span className={styles.sectionTitle}>UI & Animation</span>
                    <ul className={styles.skillsList}>
                      <li>
                        {/* GSAP Wordmark */}
                        <svg viewBox="0 0 34 14" fill="currentColor">
                          <text
                            x="0"
                            y="11"
                            font-family="Impact, sans-serif"
                            font-weight="900"
                            font-size="12"
                            font-style="italic"
                            letter-spacing="-0.5"
                          >
                            GSAP
                          </text>
                        </svg>
                        <span>GSAP</span>
                      </li>
                      <li>
                        {/* Framer Motion (Official Logo Shape) */}
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5 2h14v7h-7z M5 9h7l7 7H5z M5 16h7v7z" />
                        </svg>
                        <span>Framer Motion</span>
                      </li>
                      <li>
                        {/* Tailwind CSS (Official Waves) */}
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                        </svg>
                        <span>Tailwind CSS</span>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.skillsSection}>
                    <span className={styles.sectionTitle}>Backend</span>
                    <ul className={styles.skillsList}>
                      <li>
                        {/* Node.js (3D Hexagon Block) */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 7v10" />
                          <path d="M22 7v10" />
                          <path d="M12 12v10" />
                        </svg>
                        <span>Node.js</span>
                      </li>
                      <li>
                        {/* Express (Terminal / Server) */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                          <polyline points="6 8 8 10 6 12" />
                          <line x1="10" y1="12" x2="14" y2="12" />
                        </svg>
                        <span>Express</span>
                      </li>
                      <li>
                        {/* MongoDB (Official Leaf Shape) */}
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C12 2 8 6.5 8 12c0 3 1.5 5.5 3.5 6.5.5.25 1 .5 1.5.5v3h1v-3c.5 0 1-.25 1.5-.5C17.5 17.5 19 15 19 12c0-5.5-4-10-7-10zm0 14c-1.5 0-3-1.5-3-4 0-2.5 1.5-5 3-7 1.5 2 3 4.5 3 7 0 2.5-1.5 4-3 4z" />
                        </svg>
                        <span>MongoDB</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
