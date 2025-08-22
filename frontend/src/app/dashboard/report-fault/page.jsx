import DashboardWrapper from "@/components/DashboardWrapper";
import Link from "next/link";

export default function ReportFault() {
  return (
    <DashboardWrapper>
      <div className="h-screen flex flex-col mt-5 md:mt-20 items-center gap-20">

        <div className="w-full max-w-lg">
          <label className="block text-sm font-medium mb-1">Enter Fault Details</label>
          <input type="text" className="border border-gray-300 w-full p-2 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter fault Details" />
        </div>

        <button className="rounded bg-red-500 cursor-pointer hover:bg-red-400 active:bg-red-500 active:scale-x-95 text-white p-3 w-full max-w-lg">
          Send Report
        </button>
        
      </div>

    </DashboardWrapper>
  );
}
