import { motion } from "framer-motion";

interface StepCardProps {
  step: string;
  description: string;
  icon: string;
  index: number;
}

export const StepCard = ({ step, description, icon, index }: StepCardProps) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{step}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};