import React from "react";
import ExpiryCard from "./ExpiryCard";
import SoonExpiryCard from "./SoonExpiryCard";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/motions"; // adjust the path as needed

const PlatformInsights = () => {
  return (
    <section className="py-12 px-4 bg-white text-gray-900 dark:bg-transparent transition-colors duration-300">
      <div className="mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Platform Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
          >
            <SoonExpiryCard />
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            animate="show"
          >
            <ExpiryCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformInsights;
