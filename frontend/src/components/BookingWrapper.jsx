'use client';
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingWrapper({ subTitle, children }) {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 w-64">
        <Image
          alt="An image of the Sal Hostel"
          src="/sal-hostel-frontview.png"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tl from-red-500/30 to-blue-700/30" />

        <div className="relative z-10 p-6">
          <h1 className="text-white text-3xl font-bold">Sal Hostel</h1>
          <p className="text-white text-lg font-medium">{subTitle}</p>
        </div>

      </div>

      <div className="ml-70 my-2 mr-10">
        <button
          onClick={() => router.back()}
          className="font-bold flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 cursor-pointer active:bg-gray-200 active:scale-95"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>

        <div className="pl-10 pt-6">
          {children}
        </div>

      </div>
    </>
  );
}
