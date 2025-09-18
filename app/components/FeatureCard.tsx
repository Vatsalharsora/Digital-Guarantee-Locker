import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export const FeatureCard = ({ title, description, icon, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center hover:shadow-md transition-all duration-300">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};