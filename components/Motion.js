import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const animationVarient = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.5, ease: "linear", type: "spring" },
  },
  hidden: { opacity: 0, y: 25 },
};

const Motion = ({ className, children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={`${className}`}
      variants={animationVarient}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
