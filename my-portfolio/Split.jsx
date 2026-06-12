import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  children,
  className = "",
  delay = 1.1,
  duration = 0.8,
  ease = "linear",
  splitType = "lines",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
  startDelay = 0,
  useScrollTrigger = true,
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || (!text && !children) || !fontsLoaded) return;
      
      // FIX: Commented out so the animation runs when the page loads!
      // if (animationCompletedRef.current) return;

      const el = ref.current;

      if (el._rbsplitInstance) el._rbsplitInstance.revert();

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      // ==========================================
      // THE NATIVE GSAP MASK
      // ==========================================
      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        mask: "lines",
      });

      // Determine what actually moves (words, chars, or lines)
      let targets;
      if (splitType.includes("chars") && splitInstance.chars.length)
        targets = splitInstance.chars;
      else if (splitType.includes("words") && splitInstance.words.length)
        targets = splitInstance.words;
      else targets = splitInstance.lines;

      const tween = gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease: Array.isArray(ease) ? `cubic-bezier(${ease.join(",")})` : ease, 
          delay: startDelay,
          stagger: delay / 1000,
          ...(useScrollTrigger
            ? {
                scrollTrigger: {
                  trigger: el,
                  start,
                  once: true,
                  fastScrollEnd: true,
                  anticipatePin: 0.4,
                },
              }
            : {}),
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: "transform, opacity",
          force3D: true,
        },
      );

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        if (el._rbsplitInstance) el._rbsplitInstance.revert();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        startDelay,
        useScrollTrigger,
      ],
      scope: ref,
    },
  );

  const renderTag = () => {
    const style = {
      textAlign,
      display: "inline-block",
      whiteSpace: "pre-line", 
      wordWrap: "break-word",
      willChange: "transform, opacity",
    };

    const Tag = tag || "p";

    return (
      <Tag ref={ref} style={style} className={className}>
        {children || text}
      </Tag>
    );
  };

  return renderTag();
};

export default SplitText;