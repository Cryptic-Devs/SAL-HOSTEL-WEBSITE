import Link from "next/link";
import BookingWrapper from "@/components/BookingWrapper";
import { Banknote, CreditCard, Smartphone } from "lucide-react";

export default function Payment() {
  return (
    <BookingWrapper subTitle="Payments">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="-mt-10">
          <h1 className="font-bold mb-6 text-lg">Payment Method</h1>
          <h2 className="font-semibold mb-1">Preferred Room Type</h2>
          <div className="ml-4 mb-30 flex flex-col md:flex-row gap-x-8 items-start">
            <label className="flex justify-center items-center">
              <input
                type="radio"
                name="payment"
                value="Bank"
                className="w-4 h-4 focus:ring-blue-500"
              />
              <span className="px-1 text-base flex items-center justify-center">Bank (GCB)<CreditCard strokeWidth={1.1} className="ml-1" /></span>
            </label>
            <label className="flex justify-center items-center">
              <input
                type="radio"
                name="payment"
                value="Mobile Money"
                className="w-4 h-4 focus:ring-blue-500"
              />
              <span className="px-1 text-base flex items-center justify-center">Mobile Money<Smartphone strokeWidth={1.1} className="ml-1" /></span>
            </label>
            <label className="flex justify-center items-center">
              <input
                type="radio"
                name="payment"
                value="Cash"
                className="w-4 h-4 focus:ring-blue-500"
              />
              <span className="px-1 text-base flex items-center justify-center">Cash<Banknote strokeWidth={1.1} className="ml-1" /></span>
            </label>
          </div>

          <Link href="/booking/payment/payment-confirmation">
            <div className="flex justify-center mb-5">
              <button className="rounded bg-red-500 cursor-pointer hover:bg-red-400 active:bg-red-500 active:scale-x-95 text-white p-3 w-full max-w-lg">
                Make Payment
              </button>
            </div>
          </Link>
        </div>

      </div>
    </BookingWrapper>
      
  );
}
