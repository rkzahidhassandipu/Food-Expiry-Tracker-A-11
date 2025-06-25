import React from "react";
import ExpiredItemsCard from "./ExpiredItemsCard";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/motions"; // adjust path if needed

const ExpiredItems = () => {
  return (
    <section className="py-12 px-4 bg-white text-gray-900 dark:bg-transparent transition-colors duration-300">
      <div className="mx-auto w-full">
        <motion.h2
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          Expired Items
        </motion.h2>

        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ExpiredItemsCard />
        </motion.div>
      </div>
    </section>
  );
};

export default ExpiredItems;
