const DashboardCard = ({ title, value, color }) => {
  return (
    <div className={`${color} p-4 rounded`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-2xl">{value ?? 0}</p>
    </div>
  );
};

export default DashboardCard;