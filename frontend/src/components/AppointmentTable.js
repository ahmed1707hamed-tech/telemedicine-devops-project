import { Calendar, User, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AppointmentTable = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-12 text-center bg-slate-800/40 border border-slate-700/50 rounded-3xl"
      >
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-600">
          <Calendar size={32} />
        </div>
        <p className="text-slate-400 font-medium italic">No scheduled appointments found.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm max-w-full">
      <div className="overflow-x-auto w-full pb-4 -mb-4">
        <table className="w-full text-left min-w-[650px]">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-700/50">
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Patient Info</th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Assigned Doctor</th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Schedule Date</th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/40">
            {appointments.map((appt, idx) => (
              <motion.tr 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-blue-500/5 transition-colors group cursor-pointer"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <User size={18} />
                    </div>
                    <span className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors uppercase tracking-tight text-sm">
                      {appt.patient_name}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <span className="text-slate-300 font-medium block text-sm">{appt.doctor_name}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Specialist</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="p-2 bg-slate-900 rounded-lg">
                      <Calendar size={14} className="text-blue-500/70" />
                    </div>
                    <span className="text-sm font-medium">{new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    Confirmed
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
