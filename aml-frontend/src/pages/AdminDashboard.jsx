import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/adminService";
import DashboardCard from "../components/DashboardCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-4">
        <DashboardCard
          title="Total Users"
          value={stats?.totalUsers}
          color="bg-blue-200"
        />
        <DashboardCard
          title="Total Transactions"
          value={stats?.totalTransactions}
          color="bg-green-200"
        />
        <DashboardCard
          title="Total Cases"
          value={stats?.totalCases}
          color="bg-red-200"
        />
      </div>

      {/* Case Breakdown */}
      <h2 className="text-2xl font-semibold">Case Breakdown</h2>

      <div className="grid grid-cols-4 gap-4">
        <DashboardCard title="Open" value={stats?.caseBreakdown?.open} color="bg-yellow-200" />
        <DashboardCard title="Under Review" value={stats?.caseBreakdown?.underReview} color="bg-purple-200" />
        <DashboardCard title="Escalated" value={stats?.caseBreakdown?.escalated} color="bg-orange-200" />
        <DashboardCard title="Reported" value={stats?.caseBreakdown?.reported} color="bg-pink-200" />
        <DashboardCard title="Closed" value={stats?.caseBreakdown?.closed} color="bg-gray-200" />
      </div>
    </div>
  );
};

export default AdminDashboard;