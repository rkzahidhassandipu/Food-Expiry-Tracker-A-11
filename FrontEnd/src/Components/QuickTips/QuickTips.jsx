import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { fadeIn } from "../animation/motions"; // Adjust path as needed

const tips = [
  "Plan your meals for the week before shopping.",
  "Use the 'First-In, First-Out' (FIFO) method in your pantry and fridge.",
  "Get creative with leftovers to make new dishes.",
  "Store fruits and vegetables properly to extend freshness.",
  "Understand date labels: 'Best By' is quality, 'Use By' is safety.",
];

const QuickTips = () => {
  return (
    <div className="bg-white dark:bg-gray-900/30 my-20 rounded-3xl py-16 px-4 flex justify-center items-center">
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <motion.h2
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-10"
        >
          Quick Tips for Food Savers
        </motion.h2>

        {/* Tip cards with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", 0.2 + index * 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-start gap-4 bg-[#111827] text-white px-4 py-3 rounded-lg shadow-md"
            >
              <AiOutlineInfoCircle className="text-green-400 mt-1" size={20} />
              <p className="text-sm">{tip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickTips;
