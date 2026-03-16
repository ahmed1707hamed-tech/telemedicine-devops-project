import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  CalendarDays, 
  PlusCircle, 
  LogOut,
  Stethoscope,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { title: 'Appointments', icon: CalendarDays, path: '/appointments' },
    { title: 'Book Appointment', icon: PlusCircle, path: '/book' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden block"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar background set to #111827 as requested */}
      <aside 
        className={`flex flex-col w-64 bg-[#111827] border-r border-slate-800 fixed h-full z-50 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <Stethoscope size={24} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              TeleMed<span className="text-blue-500">.</span>
            </span>
          </div>
          <button 
            className="md:hidden text-slate-400 hover:text-white transition-colors p-2 -mr-2 rounded-lg active:bg-slate-800"
            onClick={() => setIsOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 font-sans">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white font-semibold' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="text-sm">{item.title}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/register">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-rose-400 hover:bg-rose-900/10 rounded-xl transition-all duration-200 text-sm font-medium">
              <LogOut size={20} />
              Logout
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
