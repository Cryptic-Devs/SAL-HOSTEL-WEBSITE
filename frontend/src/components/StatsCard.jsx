export default function StatsCard({ icon, count, label, subLabel }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <span className="text-3xl font-bold text-gray-800">{count}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {subLabel && (
          <p className="text-xs text-gray-500 mt-1">{subLabel}</p>
        )}
      </div>
    </div>
  );
}