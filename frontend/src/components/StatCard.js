import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-xl hover:shadow-blue-500/5 hover:border-slate-600 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 group-hover:border-blue-500/50 group-hover:text-blue-400 text-slate-400 transition-all duration-300">
          <Icon size={26} />
        </div>
        {trend && (
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg tracking-wider uppercase ${
            trend.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-slate-500 text-sm font-semibold tracking-wide uppercase">{title}</h3>
        <p className="text-3xl font-black text-slate-100">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
