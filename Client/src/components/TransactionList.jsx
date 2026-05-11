import { motion, AnimatePresence } from 'framer-motion';

export default function TransactionList({ items, type }) {
  const colorClass = type === 'income' ? 'text-accent-600' : 'text-danger-600';
  const bgClass = type === 'income' ? 'bg-accent-50' : 'bg-danger-50';

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ x: 4, backgroundColor: 'rgba(241,245,249,1)' }}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-surface-100 cursor-default"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${bgClass} rounded-xl flex items-center justify-center`}>
                <span className={`text-sm font-bold ${colorClass}`}>
                  {item.category.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-900">{item.category}</p>
                <p className="text-xs text-surface-400">{item.date}</p>
              </div>
            </div>
            <span className={`text-sm font-bold ${colorClass}`}>
              {type === 'income' ? '+' : '-'}${item.amount.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
