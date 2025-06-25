import React from "react";
import ExpiringSoonCard from "./ExpiringSoonCard";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/motions"; 

const ExpiringSoon = () => {
  return (
    <section className="py-12 px-4 bg-white text-gray-900 dark:bg-transparent transition-colors duration-300">
      <div className="mx-auto w-full">
        {/* Heading with animation */}
        <motion.h2
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Expiring Soon
        </motion.h2>

        {/* Card container with animation */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ExpiringSoonCard />
        </motion.div>
      </div>
    </section>
  );
};

export default ExpiringSoon;
