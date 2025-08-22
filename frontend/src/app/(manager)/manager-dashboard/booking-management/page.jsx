'use client';
import { useState } from 'react';
import AdminWrapper from '@/components/ManagerWrapper';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Eye, Download } from 'lucide-react';

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      bookingId: 'BK001',
      studentName: 'John Doe', 
      studentId: 'STU001',
      roomNumber: '204',
      bookingType: 'Academic Year',
      startDate: '2024-09-01',
      endDate: '2025-06-30',
      status: 'confirmed',
      paymentStatus: 'paid',
      amount: 'GHS 5,000'
    },
    { 
      id: 2, 
      bookingId: 'BK002',
      studentName: 'Jane Smith', 
      studentId: 'STU002',
      roomNumber: '105',
      bookingType: 'Short Stay',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      status: 'pending',
      paymentStatus: 'pending',
      amount: 'GHS 1,000'
    },
    { 
      id: 3, 
      bookingId: 'BK003',
      studentName: 'Mike Johnson', 
      studentId: 'STU003',
      roomNumber: '302',
      bookingType: 'Academic Year',
      startDate: '2024-09-01',
      endDate: '2025-06-30',
      status: 'confirmed',
      paymentStatus: 'paid',
      amount: 'GHS 5,000'
    },
    { 
      id: 4, 
      bookingId: 'BK004',
      studentName: 'Sarah Williams', 
      studentId: 'STU004',
      roomNumber: 'Pending',
      bookingType: 'Academic Year',
      startDate: '2024-09-15',
      endDate: '2025-06-30',
      status: 'pending',
      paymentStatus: 'partial',
      amount: 'GHS 5,000'
    },
    { 
      id: 5, 
      bookingId: 'BK005',
      studentName: 'David Brown', 
      studentId: 'STU005',
      roomNumber: '210',
      bookingType: 'Short Stay',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      status: 'cancelled',
      paymentStatus: 'refunded',
      amount: 'GHS 500'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesPayment = filterPayment === 'all' || booking.paymentStatus === filterPayment;
    const matchesType = filterType === 'all' || booking.bookingType === filterType;
    return matchesSearch && matchesStatus && matchesPayment && matchesType;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="text-green-600" size={18} />;
      case 'pending': return <Clock className="text-yellow-600" size={18} />;
      case 'cancelled': return <XCircle className="text-red-600" size={18} />;
      default: return <AlertCircle className="text-gray-600" size={18} />;
    }
  };

  const getPaymentBadge = (status) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      partial: 'bg-orange-100 text-orange-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminWrapper>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Booking Management</h1>
          <p className="text-gray-600 mt-2">Manage all student bookings and room assignments</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
            <p className="text-blue-100 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold">{bookings.length}</p>
            <p className="text-xs text-blue-100 mt-2">↑ 12% from last month</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white">
            <p className="text-green-100 text-sm">Confirmed</p>
            <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</p>
            <p className="text-xs text-green-100 mt-2">Active bookings</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-xl text-white">
            <p className="text-yellow-100 text-sm">Pending</p>
            <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
            <p className="text-xs text-yellow-100 mt-2">Awaiting approval</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
            <p className="text-purple-100 text-sm">Revenue</p>
            <p className="text-2xl font-bold">GHS 16,500</p>
            <p className="text-xs text-purple-100 mt-2">This month</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-xl text-white">
            <p className="text-red-100 text-sm">Cancelled</p>
            <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'cancelled').length}</p>
            <p className="text-xs text-red-100 mt-2">This month</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, booking ID, or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="all">Payment Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Payment Pending</option>
                <option value="partial">Partial Payment</option>
                <option value="refunded">Refunded</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="all">Booking Type</option>
                <option value="Academic Year">Academic Year</option>
                <option value="Short Stay">Short Stay</option>
              </select>

              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Calendar size={18} />
                Date Range
              </button>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                    <p className="font-semibold text-lg">{booking.bookingId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(booking.status)}
                    <span className="text-sm font-medium capitalize">{booking.status}</span>
                  </div>
                </div>

                {/* Student Info */}
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Student</p>
                    <p className="font-medium">{booking.studentName}</p>
                    <p className="text-sm text-gray-600">{booking.studentId}</p>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Room</p>
                      <p className="font-medium">{booking.roomNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="font-medium">{booking.bookingType}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm">{booking.startDate} to {booking.endDate}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-semibold text-lg">{booking.amount}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentBadge(booking.paymentStatus)}`}>
                    {booking.paymentStatus}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium">
                    View Details
                  </button>
                  {booking.status === 'pending' && (
                    <>
                      <button className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium">
                        Approve
                      </button>
                      <button className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Load More Bookings
          </button>
        </div>
      </div>
    </AdminWrapper>
  );
}