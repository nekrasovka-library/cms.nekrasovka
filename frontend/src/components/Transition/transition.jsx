import React from "react";
import { motion } from "framer-motion";

const defaultVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  out: {
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const Transition = ({ children, variants, className }) => {
  const animationVariants = variants || defaultVariants;

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="in"
      exit="out"
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
