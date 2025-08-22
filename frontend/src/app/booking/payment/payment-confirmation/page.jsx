import BookingWrapper from "@/components/BookingWrapper";
import { Check } from "lucide-react";

export default function PaymentConfirmation() {
  return (
    <BookingWrapper subTitle="Payment Confirmation">
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <div className="rounded-full p-15 bg-green-500">
          <Check size={100} color="white" />
        </div>
        <div className="font-bold mt-8">Payment Confirmed</div>
        <div className="px-4">An SMS will be sent to confirm payment. This may take a while.</div>
      </div>
    </BookingWrapper>

  );
}
