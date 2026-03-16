import { Bell, Search, User, Menu } from 'lucide-react';

const Navbar = ({ setIsSidebarOpen }) => {
  return (
    <header className="h-20 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 fixed top-0 right-0 left-0 md:left-64 z-20 px-4 sm:px-6 md:px-10 font-sans">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          <button 
            className="md:hidden p-2.5 -ml-2 text-slate-400 hover:text-white transition-colors rounded-xl active:bg-slate-800 touch-manipulation"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open Sidebar"
          >
            <Menu size={28} />
          </button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="w-full pl-12 pr-4 py-2 bg-slate-800 border border-slate-700/50 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="relative p-2.5 text-slate-400 hover:text-blue-400 transition-all rounded-xl active:bg-slate-800 touch-manipulation">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border border-slate-900"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-slate-800 mx-0 sm:mx-1"></div>
          
          <div className="flex items-center gap-4 cursor-pointer group">
            <img
              src="/admin.jpg"
              alt="Ahmed Hamed"
              className="w-9 h-9 rounded-full object-cover border border-slate-700 group-hover:border-blue-500 transition-all shadow-lg shadow-blue-500/10"
            />
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-none">Ahmed Hamed</p>
              <p className="text-xs text-slate-500 font-medium tracking-wide mt-1">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
