import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Users, CalendarDays, Stethoscope, Activity, RefreshCw } from 'lucide-react';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import { getAppointments } from '../services/api';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch logic using the fixed api.js
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await getAppointments();
      setAppointments(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('API Error:', err);
      setError('Connection to backend failed. Please ensure the API is running at /api');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Process data for charts
  const getChartData = () => {
    if (!appointments.length) return [{ date: 'No Data', count: 0 }];
    const counts = {};
    appointments.forEach(appt => {
      try {
        const date = new Date(appt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        counts[date] = (counts[date] || 0) + 1;
      } catch (e) {}
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  };

  return (
    <div className="space-y-8 font-sans">
      <Head>
        <title>Dashboard | Ahmed Hamed</title>
      </Head>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 font-medium mt-1 text-sm md:text-base">Status Report for Administrator: Ahmed Hamed</p>
        </div>
        
        <button 
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-4 md:py-3 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl hover:text-blue-400 hover:border-blue-500 transition-all font-bold text-sm touch-manipulation active:scale-[0.98]"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          REFRESH
        </button>
      </div>

      {error ? (
        <div className="p-6 bg-red-900/20 border border-red-500/50 rounded-2xl text-red-400 text-sm font-semibold">
          {error}
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Appointments" 
              value={loading ? '...' : appointments.length} 
              icon={CalendarDays} 
              trend="+12%"
            />
            <StatCard 
              title="Assigned Doctors" 
              value="18" 
              icon={Stethoscope} 
            />
            <StatCard 
              title="Active Patients" 
              value="1,240" 
              icon={Users} 
              trend="+5%"
            />
            <StatCard 
              title="Clinic Capacity" 
              value="85%" 
              icon={Activity} 
            />
          </section>

          <section className="col-span-1 lg:col-span-3">
            <ChartCard data={getChartData()} />
          </section>
        </>
      )}
    </div>
  );
}
