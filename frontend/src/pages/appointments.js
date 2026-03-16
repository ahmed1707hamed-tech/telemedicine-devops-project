import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import AppointmentTable from '../components/AppointmentTable';
import { getAppointments } from '../services/api';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAppointments();
        setAppointments(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAppointments = appointments.filter(appt => 
    appt.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      <Head>
        <title>Appointments | Ahmed Hamed</title>
      </Head>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Appointments Registry</h1>
          <p className="text-slate-400 font-medium text-sm md:text-base">Manage and monitor all patient sessions.</p>
        </div>
        
        <button className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-4 md:py-3 bg-[#1e293b] border border-slate-700 text-slate-300 rounded-xl hover:text-white hover:border-slate-600 transition-all font-bold text-sm touch-manipulation active:scale-[0.98]">
          <Download size={18} />
          EXPORT CSV
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by patient or doctor..." 
            className="w-full pl-12 pr-6 py-4 bg-[#1e293b] border border-slate-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-100 placeholder:text-slate-600 font-medium touch-manipulation"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-[#1e293b] border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-700 transition-all font-bold text-sm touch-manipulation active:scale-[0.98] w-full md:w-auto">
          <Filter size={20} />
          FILTERS
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-80 gap-4">
          <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold tracking-widest text-xs uppercase animate-pulse">Syncing Data...</p>
        </div>
      ) : (
        <AppointmentTable appointments={filteredAppointments} />
      )}
    </div>
  );
}
