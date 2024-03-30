import { motion } from "framer-motion";

export const AnimateRow = ({ children, index, id, fn }) => {
  return (
    <motion.tr
      onClick={() => {
        fn(id);
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.02 }}
      className="py-8 whitespace-nowrap hover:bg-white hover:bg-opacity-30"
    >
      {children}
    </motion.tr>
  );
};
