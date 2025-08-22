'use client';
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  User, 
  Bed, 
  AlertCircle, 
  FileText,
  Bell, 
  LogOut 
} from "lucide-react";

export default function DashboardWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/available-beds', label: 'View Available Beds', icon: Bed },
    { href: '/dashboard/report-fault', label: 'Report Fault', icon: AlertCircle },
    { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { href: '/dashboard/policies', label: 'Policies', icon: FileText },
  ];

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Signing out...');
    // router.push('/login');
  };

  return (
    <>
      {/* Header on mobile, Sidebar from medium screens */}
      <div className="fixed top-0 left-0 right-0 h-20 md:h-full md:right-auto md:bottom-0 md:w-64 z-40">
        <Image
          alt="An image of the Sal Hostel"
          src="/sal-hostel-frontview.png"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tl from-red-500/30 to-blue-700/30" />

        <div className="relative z-10 p-3 md:p-6">
          <Link href="/">
            <h1 className="text-white text-lg md:text-3xl font-bold cursor-pointer hover:text-white/80 active:scale-99 active:text-white">Sal Hostel</h1>
          </Link>
          
          <p className="text-white text-sm md:text-base font-medium">Student Dashboard</p>

          {/* Navigation Links - Only visible on desktop in sidebar */}
          <nav className="hidden md:block mt-8 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-semibold">{link.label}</span>
                </Link>
              );
            })}
            
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors w-full text-left cursor-pointer"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation - Under header, only visible on mobile */}
      <div className="md:hidden fixed top-20 left-0 right-0 bg-white border-b-0 shadow-sm z-30">
        <nav className="flex overflow-x-auto p-2 gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-sm w-full ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap text-sm cursor-pointer"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </nav>
      </div>

      {/* Main content area */}
      <div className="pt-36 md:pt-0 md:ml-64 min-h-screen p-4 md:p-6">
        {children}
      </div>
    </>
  );
}