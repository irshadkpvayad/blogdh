import { Routes, Route, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const DashboardHome = () => {
  const { dbUser } = useAuthStore();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {dbUser?.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-slate-500 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-bold mt-2">{dbUser?.totalPosts}</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-slate-500 text-sm font-medium">Total Comments</h3>
          <p className="text-3xl font-bold mt-2">{dbUser?.totalComments}</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-slate-500 text-sm font-medium">Followers</h3>
          <p className="text-3xl font-bold mt-2">{dbUser?.followers}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, dbUser } = useAuthStore();

  if (!user) {
    return <div className="p-10 text-center text-xl">Please log in to view dashboard</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="glass rounded-2xl p-4 sticky top-24">
          <div className="flex items-center space-x-3 mb-6 p-2">
            <img src={dbUser?.profilePicture || user.photoURL} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{dbUser?.name}</p>
              <p className="text-xs text-slate-500">{dbUser?.role}</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <Link to="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Overview</Link>
            <Link to="/dashboard/requests" className="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">My Requests</Link>
            <Link to="/dashboard/settings" className="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Settings</Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          {/* We will add requests and settings later */}
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
