import { useEffect, useState } from 'react';
import { Users, MapPin, Star, Bookmark, Activity } from 'lucide-react';
import { getDashboardStats } from '../../services/adminApi';

interface DashboardStats {
  totals: {
    totalUsers: number;
    totalPlaces: number;
    totalReviews: number;
    totalSavedPlaces: number;
  };
  recentActivity: {
    users: any[];
    places: any[];
  };
  insights?: {
    topStates: { state: string; count: number }[];
    ratingBuckets: { _id: number; count: number }[];
    mostSavedPlaces: { _id: string; title: string; state: string; saves: number }[];
  };
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Users', value: stats?.totals.totalUsers || 0, icon: <Users size={24} />, color: 'from-blue-500 to-indigo-600' },
    { title: 'Total Places', value: stats?.totals.totalPlaces || 0, icon: <MapPin size={24} />, color: 'from-emerald-400 to-teal-500' },
    { title: 'Total Reviews', value: stats?.totals.totalReviews || 0, icon: <Star size={24} />, color: 'from-sky-400 to-blue-500' },
    { title: 'Saved Items', value: stats?.totals.totalSavedPlaces || 0, icon: <Bookmark size={24} />, color: 'from-purple-500 to-pink-500' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-neutral-900/80 animate-pulse rounded-2xl border border-neutral-800"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-emerald-400" size={28} />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          Platform Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="group block relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 p-6 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/20"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-30`}></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-neutral-400 text-sm font-medium mb-1">{card.title}</p>
                <h3 className="text-4xl font-bold text-white tracking-tight">
                  {/* Future: Add counting animation here */}
                  {card.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} bg-opacity-10 text-white shadow-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-neutral-200">Recent Users</h3>
          <div className="space-y-4">
            {stats?.recentActivity.users.map((u, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-neutral-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-emerald-400 font-medium">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{u.name}</p>
                    <p className="text-xs text-neutral-400">{u.email}</p>
                  </div>
                </div>
                <span className="text-xs text-neutral-500">{new Date(u.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-neutral-200">Recent Places</h3>
          <div className="space-y-4">
            {stats?.recentActivity.places.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-neutral-800/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{p.title}</span>
                  <span className="text-xs text-neutral-400">Added on {new Date(p.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-neutral-200">Top States by Places</h3>
          <div className="space-y-3">
            {(stats?.insights?.topStates || []).map((item) => (
              <div key={item.state}>
                <div className="flex justify-between text-sm text-neutral-300 mb-1">
                  <span>{item.state}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 rounded bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-sky-400" style={{ width: `${Math.min(item.count * 20, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-neutral-200">Ratings Distribution</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((rating) => {
              const bucket = (stats?.insights?.ratingBuckets || []).find((b) => b._id === rating);
              const count = bucket?.count || 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm text-neutral-400 w-12">{rating} star</span>
                  <div className="h-2 flex-1 rounded bg-neutral-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" style={{ width: `${Math.min(count * 15, 100)}%` }} />
                  </div>
                  <span className="text-xs text-neutral-300 w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-neutral-200">Most Saved Places</h3>
          <div className="space-y-3">
            {(stats?.insights?.mostSavedPlaces || []).map((item) => (
              <div key={item._id} className="rounded-xl border border-neutral-800 p-3">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-neutral-400 mt-1">{item.state}</p>
                <p className="text-xs text-emerald-400 mt-1">{item.saves} saves</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
