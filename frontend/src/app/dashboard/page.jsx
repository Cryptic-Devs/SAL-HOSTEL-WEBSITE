'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardWrapper from "@/components/DashboardWrapper";
import api from '@/lib/api';
import { Loader2, User, Mail, Phone, BookOpen, Hash, Calendar } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('auth-token');
      if (!token) {
        router.push('/signIn');
        return;
      }

      // Fetch user profile using the /api/profile endpoint
      const profileResponse = await api.get('/profile');
      setUserData(profileResponse.data);

      // Fetch booking details if exists
      try {
        const bookingResponse = await api.get('/bookings/my-bookings');
        if (bookingResponse.data && bookingResponse.data.length > 0) {
          setBookingData(bookingResponse.data[0]); // Get the most recent booking
        }
      } catch (bookingError) {
        console.log('No bookings found');
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      if (err.response?.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
        router.push('/signIn');
      } else {
        setError('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardWrapper>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardWrapper>
    );
  }

  if (error) {
    return (
      <DashboardWrapper>
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Welcome back, {userData?.firstName}!
        </h1>

        {/* User Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profile Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2" size={20} />
              Profile Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-400" size={16} />
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{userData?.email}</span>
              </div>
              <div className="flex items-center">
                <Hash className="mr-2 text-gray-400" size={16} />
                <span className="text-gray-600">Student ID:</span>
                <span className="ml-2 font-medium">{userData?.studentId || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-gray-400" size={16} />
                <span className="text-gray-600">Contact:</span>
                <span className="ml-2 font-medium">{userData?.contactNumber || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="mr-2 text-gray-400" size={16} />
                <span className="text-gray-600">Program:</span>
                <span className="ml-2 font-medium">{userData?.program || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Booking Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2" size={20} />
              Booking Status
            </h2>
            {bookingData ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">{bookingData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room:</span>
                  <span className="font-medium">{bookingData.roomNumber || 'Pending Assignment'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                    bookingData.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : bookingData.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {bookingData.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                    bookingData.paymentStatus === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bookingData.paymentStatus || 'Pending'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No active booking found</p>
                <button
                  onClick={() => router.push('/booking')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Book a Room
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/profile')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <User className="mx-auto mb-2" size={24} />
              <p className="text-sm">View Profile</p>
            </button>
            <button
              onClick={() => router.push('/available-beds')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="mx-auto mb-2" size={24} />
              <p className="text-sm">View Available Beds</p>
            </button>
            <button
              onClick={() => router.push('/report-fault')}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail className="mx-auto mb-2" size={24} />
              <p className="text-sm">Report Fault</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}