'use client';
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingWrapper({ subTitle, children }) {
  const router = useRouter();

  return (
    <>
      {/* Header on mobile, Sidebar from medium screens */}
      <div className="fixed top-0 left-0 right-0 h-20 md:h-full md:right-auto md:bottom-0 md:w-64 z-10">
        <Image
          alt="An image of the Sal Hostel"
          src="/sal-hostel-frontview.png"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tl from-red-500/30 to-blue-700/30" />

        <div className="relative z-10 p-3 md:p-6">
          <h1 className="text-white text-lg md:text-3xl font-bold">Sal Hostel</h1>
          <p className="text-white text-sm md:text-lg font-medium">{subTitle}</p>
        </div>
      </div>

      {/* Main content area */}
      <div className="pt-24 md:pt-0 md:ml-64 min-h-screen p-4 md:p-6">
        <button
          onClick={() => router.back()}
          className="font-bold flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 cursor-pointer active:bg-gray-200 active:scale-95 mb-4 mt-2"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>

        {children}
      </div>
    </>
  );
}