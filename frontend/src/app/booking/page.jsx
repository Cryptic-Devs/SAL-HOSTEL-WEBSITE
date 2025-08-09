import BookingWrapper from "@/components/BookingWrapper";
import Link from "next/link";
export default function BookingPage() {
  return (
    <BookingWrapper subTitle="Booking">
      <div className="absolute top-26 md:top-2 right-6">
        <Link href="/signIn">
          <button className="font-bold hover:bg-gray-100 rounded-lg p-2 cursor-pointer active:bg-gray-200 active:scale-95">Sign In</button>
        </Link>
      </div>

      <div className="mt-15">

        <h1 className="font-bold mb-20">Select Booking Period</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/booking/academic-year">
            <div className="card w-full max-w-sm bg-white shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 relative group overflow-hidden h-54 cursor-pointer active:scale-95">
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-tl from-red-500 to-blue-700 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
              <div className="card-body items-center justify-center">
                <div className="card-title justify-center">Academic Year Booking</div>
              </div>
            </div>
          </Link>

          <Link href="/booking/short-stay">
            <div className="card w-full max-w-sm bg-white shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 relative group overflow-hidden h-54 cursor-pointer active:scale-95">
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-tl from-red-500 to-blue-700 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
              <div className="card-body items-center justify-center">
                <div className="card-title justify-center">Short Stay Booking</div>
              </div>
            </div>
          </Link>
        </div>

      </div>

    </BookingWrapper>
  );
}