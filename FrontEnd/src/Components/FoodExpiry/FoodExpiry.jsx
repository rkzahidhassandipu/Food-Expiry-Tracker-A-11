import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/motions"; // adjust path if needed
import WhyUseFoodExpiryBody from "./WhyUseFoodExpiryBody";

const WhyUseFoodExpiry = () => {
  return (
    <section className="py-12 px-4 bg-white text-gray-900 dark:bg-transparent transition-colors duration-300">
      <div className="mx-auto w-full">
        {/* Animated Heading */}
        <motion.h2
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Why Use FoodExpiry?
        </motion.h2>

        {/* Animated Body */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <WhyUseFoodExpiryBody />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUseFoodExpiry;
