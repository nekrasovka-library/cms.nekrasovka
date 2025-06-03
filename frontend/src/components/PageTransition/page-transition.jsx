import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 20,
    },
  },
  out: {
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 20,
    },
  },
};

const PageTransition = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
