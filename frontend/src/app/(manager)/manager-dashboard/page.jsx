'use client';
import ManagerWrapper from '@/components/ManagerWrapper';
import StatsCard from '@/components/StatsCard';
import { Users, Bed, DollarSign, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function ManagerDashboardPage() {
  // Sample data - replace with API calls
  const stats = {
    pendingApprovals: 4,
    availableBeds: 4,
    studentProfiles: 15,
    staffCount: 10
  };

  const recentNotifications = [
    { id: 1, message: "New booking request from John Doe", time: "2 hours ago" },
    { id: 2, message: "Payment received from Jane Smith", time: "4 hours ago" },
    { id: 3, message: "Maintenance report submitted for Room 204", time: "1 day ago" }
  ];

  const recentFaults = [
    { id: 1, room: "Room 204", issue: "Leaking tap", status: "pending", date: "Nov 14, 2025" },
    { id: 2, room: "Room 105", issue: "Broken window", status: "resolved", date: "Nov 13, 2025" },
    { id: 3, room: "Room 302", issue: "AC not working", status: "pending", date: "Nov 12, 2025" }
  ];

  return (
    <ManagerWrapper>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, Manager</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            count={stats.pendingApprovals}
            label="Pending Approvals"
            subLabel="Since Dec 15, 2025"
          />
          
          <StatsCard
            icon={<Bed className="w-6 h-6 text-green-600" />}
            count={stats.availableBeds}
            label="Available Beds"
            subLabel="Since Nov 14, 2025"
          />
          
          <StatsCard
            icon={<Users className="w-6 h-6 text-purple-600" />}
            count={stats.studentProfiles}
            label="Student Profiles"
            subLabel="Since Nov 24, 2025"
          />
          
          <StatsCard
            icon={<Users className="w-6 h-6 text-orange-600" />}
            count={stats.staffCount}
            label="Staff Count"
            subLabel="Since Jan 14, 2025"
          />
        </div>

        {/* Recent Notifications and Faults */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Notifications</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View all →</button>
            </div>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Faults */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Faults</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View all →</button>
            </div>
            <div className="space-y-3">
              {recentFaults.map((fault) => (
                <div key={fault.id} className="border-l-4 border-orange-400 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{fault.room}</p>
                      <p className="text-sm text-gray-600">{fault.issue}</p>
                      <p className="text-xs text-gray-500 mt-1">{fault.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      fault.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {fault.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ManagerWrapper>
  );
}