import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <Navbar />
        <main className="flex-1 p-6 md:p-10 mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
