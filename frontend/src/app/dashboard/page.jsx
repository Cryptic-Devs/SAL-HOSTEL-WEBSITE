'use client';

import { useEffect, useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';

export default function DashboardPage() {
  const [student, setStudent] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch('/api/student');
      const data = await res.json();
      setStudent(data);
    };

    const fetchAnnouncements = async () => {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data);
    };

    Promise.all([fetchStudent(), fetchAnnouncements()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return (
      <DashboardWrapper>
        <p>Loading dashboard...</p>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <div className="space-y-6 max-w-4xl mx-auto px-6 py-10">
        {/* Student Info */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full" />
          <div>
            <p className="font-bold">{student?.name || 'Student'}</p>
            <p className="text-sm text-gray-500">{student?.id || 'ID'}</p>
          </div>
        </div>

        {/* Date, Welcome & Room Number on same line */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded">
          <div>
            <p className="text-sm text-gray-500">{today}</p>
            <h2 className="font-bold text-2xl">
              Welcome back, {student?.name?.split(' ')[0] || 'Student'}!
            </h2>
          </div>

          <div className="text-center">
            <p className="font-bold text-gray-500 mb-1">Room</p>
            <p className="text-4xl font-extrabold">
              {student?.roomNumber || 'Not Assigned'}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="flex gap-4">
          {/* Room Type */}
          <div className="bg-gray-100 p-4 rounded w-1/2">
            <h3 className="font-bold mb-2">Room Type</h3>
            <p>{student?.roomType || 'Not Assigned'}</p>
            <p>{student?.floor ? `Floor: ${student.floor}` : ''}</p>
            <p className="mt-2">👥 {student?.roomOccupancy || '0'}</p>
          </div>

          {/* Announcements */}
          <div className="bg-gray-100 p-4 rounded w-1/2 overflow-y-auto max-h-48">
            <h3 className="font-bold mb-2">Announcements</h3>
            {announcements.length > 0 ? (
              <ul className="list-disc ml-5 space-y-1 max-h-36 overflow-y-auto">
                {announcements.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            ) : (
              <p>No announcements.</p>
            )}
          </div>
        </div>

        {/* Status Banner */}
        {student?.accountStatus === 'approved' && (
          <div className="bg-green-200 text-green-900 p-4 text-center font-bold rounded-md mt-6">
            Your Account Has Been Approved
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
}
