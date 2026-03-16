import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import FormInput from '../components/FormInput';
import { createAppointment } from '../services/api';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BookAppointment() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patient_name: '',
    doctor_name: '',
    date: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Correctly calling the API sending keys: patient_name, doctor_name, date
      await createAppointment(formData);
      toast.success('Appointment booked successfully!');
      router.push('/appointments');
    } catch (err) {
      toast.error('Scheduling failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Head>
        <title>Schedules | Ahmed Hamed</title>
      </Head>

      <Link href="/appointments">
        <button className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors mb-8 group font-bold text-xs tracking-widest uppercase">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Cancel and Return
        </button>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1e293b] p-6 sm:p-10 md:p-12 rounded-3xl border border-slate-700/50 shadow-2xl mx-4 sm:mx-0"
      >
        <div className="text-center mb-8 md:mb-10">
          <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">New Appointment</h1>
          <p className="text-slate-400 mt-2 font-medium text-sm md:text-base">Register a patient for a clinical session.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Patient Name"
            id="patient_name"
            placeholder="John Doe"
            value={formData.patient_name}
            onChange={handleChange}
          />
          
          <FormInput
            label="Doctor Name"
            id="doctor_name"
            placeholder="Dr. Gregory House"
            value={formData.doctor_name}
            onChange={handleChange}
          />
          
          <FormInput
            label="Date"
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-black text-sm tracking-[0.1em] uppercase transition-all mt-6 md:mt-4 touch-manipulation active:scale-[0.98] ${
              loading 
                ? 'bg-slate-700 cursor-not-allowed opacity-50' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/40'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <CheckCircle2 size={20} />
                CONFIRM BOOKING
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
