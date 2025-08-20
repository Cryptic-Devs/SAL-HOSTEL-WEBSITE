import DashboardWrapper from "@/components/DashboardWrapper"

export default function NotificationsPage() {
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

  return (
    <DashboardWrapper>
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl mx-auto h-[85vh]">
          {/* Card Header */}
          <div className="text-center py-6 border-b-0 shadow-sm">
            <h1 className="text-2xl font-semibold">Notifications</h1>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">
            <div className="p-6 space-y-6">
              {notifications.map((notification) => (
                <div key={notification.id} className="space-y-2 cursor-pointer hover:bg-gray-100">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <span className={`badge ${
                      notification.category === "Students" 
                        ? "badge-success" 
                        : "badge-warning"
                    } badge-sm`}>
                      {notification.category}
                    </span>
                  </div>

                  {/* Notification Content */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">
                      {notification.title}
                    </h3>
                    <p className="text-gray-700">
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-500">
                        {notification.sender}
                      </span>
                      <span className="text-sm text-gray-400">
                        {notification.date}
                      </span>
                    </div>
                  </div>

                  {/* Divider line */}
                  {notifications.indexOf(notification) !== notifications.length - 1 && (
                    <div className="divider my-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}