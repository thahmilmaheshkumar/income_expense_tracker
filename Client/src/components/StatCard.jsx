import { motion } from "framer-motion";

export default function StatCard({ title, amount, icon, color, delay = 0 }) {
  const colorMap = {
    primary: {
      bg: "bg-primary-50",
      icon: "bg-primary-500",
      text: "text-primary-700",
    },
    accent: {
      bg: "bg-accent-50",
      icon: "bg-accent-500",
      text: "text-accent-700",
    },
    danger: {
      bg: "bg-danger-50",
      icon: "bg-danger-500",
      text: "text-danger-700",
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
      className={`${colors.bg} rounded-2xl p-6 border border-surface-100 cursor-default`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-surface-500">{title}</span>
        <div
          className={`w-10 h-10 ${colors.icon} rounded-xl flex items-center justify-center`}
        >
          <span className="text-white text-lg">{icon}</span>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className={`text-3xl font-bold ${colors.text}`}
      >
        ₹{amount.toLocaleString()}
      </motion.p>
    </motion.div>
  );
}
