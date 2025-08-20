'use client';
import DashboardWrapper from "@/components/DashboardWrapper"
import { useState } from "react"

export default function NotificationsPage() {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const notifications = [
    {
      id: 1,
      category: "Students",
      title: "Room Assignment",
      message: "You have been assigned to Room 204 in Block A.",
      sender: "From Manager",
      date: "August 13, 2025",
      read: false
    },
    {
      id: 2,
      category: "Students",
      title: "Maintenance Scheduled",
      message: "Water maintenance scheduled for tomorrow 9 AM - 12 PM.",
      sender: "From Manager",
      date: "August 12, 2025",
      read: false
    },
    {
      id: 3,
      category: "General",
      title: "Welcome to Sal Hostel",
      message: "Your registration has been approved. Welcome to Sal Hostel community!",
      sender: "From Manager",
      date: "August 12, 2025",
      read: true
    },
    {
      id: 4,
      category: "Students",
      title: "Document Verified",
      message: "Your admission letter has been verified successfully.",
      sender: "From Manager",
      date: "August 13, 2025",
      read: true
    },
  ];

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    // You can add more logic here like marking as read, opening a modal, etc.
    console.log("Clicked notification:", notification);
  };

  return (
    <DashboardWrapper>
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg h-[85vh] flex flex-col">
          {/* Header */}
          <div className="text-center py-8 border-b-0 shadow-sm">
            <h1 className="text-3xl font-medium">Notifications</h1>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-6">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="cursor-pointer rounded-lg p-4 -mx-4 transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-[0.98] active:bg-gray-100"
                >
                  {/* Category Label */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded text-white text-sm font-medium ${notification.category === "Students"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                      }`}>
                      {notification.category}
                    </span>
                  </div>

                  {/* Message Content */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {notification.title}
                    </h3>
                    <p className="text-gray-700">
                      {notification.message}
                    </p>
                  </div>

                  {/* Sender and Date */}
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-500">
                      {notification.sender}
                    </span>
                    <span className="text-sm text-gray-400">
                      {notification.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}