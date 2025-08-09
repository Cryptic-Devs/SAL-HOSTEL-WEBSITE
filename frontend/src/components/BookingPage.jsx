'use client';
import BookingWrapper from "@/components/BookingWrapper";
import { useState } from "react";
import { Upload, CheckLine, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <h1 className="font-bold mb-10">Student Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your first name" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your last name" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Student ID</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your Student ID" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Number</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your contact" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="border border-gray-300 w-full p-2 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your Email" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <input type="text" className="border-gray-300 w-full p-2 border rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter current level" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Program Of Study</label>
          <input type="text" className="w-full p-2 border-gray-300 border rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your program of study" />
        </div>

        <div className="relative">
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm"
              placeholder="Create an eight digit password"
            />

          </div>
          <button
            onClick={toggleShowPassword}
            className="absolute top-[2.25rem] right-2 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

      </div>

      <div className="my-10">
        <h1 className="font-bold">Proof of Admission</h1>
        <h2>Upload Admission Letter</h2>
      </div>

      <label htmlFor="file-upload" className="block cursor-pointer">
        <div className="bg-gray-200 rounded-lg py-15 px-2 flex flex-col items-center hover:bg-gray-300 transition-colors">
          {selectedFile ?
            (<p className="text-lg text-gray-700 text-center"><CheckLine className="flex w-full" />Uploaded!</p>)
            :
            (<p className="text-lg text-gray-700 text-center"><Upload className="flex w-full" />Upload Admission Letter Here</p>)}
        </div>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
      </label>
      {selectedFile && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            Selected: <span className="font-semibold">{selectedFile.name}</span>
          </p>
        </div>
      )}

      <div className="mt-10">

        <h1 className="font-bold mb-5">Room Preferences</h1>


        <p className="font-semibold ml-2 text-md">Preferred Room Type:</p>
        <div className="ml-4 mb-5 flex flex-col md:flex-row gap-x-8">
          <label>
            <input
              type="radio"
              name="room-type"
              value="4"
              className="w-4 h-4 focus:ring-blue-500"
            />
            <span className="px-1 text-base">4 in a room</span>
          </label>
          <label>
            <input
              type="radio"
              name="room-type"
              value="3"
              className="w-4 h-4 focus:ring-blue-500"
            />
            <span className="px-1 text-base">3 in a room</span>
          </label>
          <label>
            <input
              type="radio"
              name="room-type"
              value="3"
              className="w-4 h-4 focus:ring-blue-500"
            />
            <span className="px-1 text-base">2 in a room</span>

          </label>
        </div>


        <p className="font-semibold ml-2 text-md">Gender:</p>
        <div className="ml-4 mb-5 flex flex-col md:flex-row gap-x-8">
          <label>
            <input
              type="radio"
              name="Gender"
              value="male"
              className="w-4 h-4 focus:ring-blue-500"
            />
            <span className="px-1 text-base">Male</span>

          </label>
          <label>
            <input
              type="radio"
              name="Gender"
              value="female"
              className="w-4 h-4 focus:ring-blue-500"
            />
            <span className="px-1 text-base">Female</span>

          </label>
        </div>

        <p className="font-semibold text-md ml-2">Available Rooms</p>
        <select
          name="educationalLevel"
          className="select ml-4 mb-5 mt-1"
          required
        >
          <option value="">Select Room</option>
          <option value="room 101">Room 101</option>
          <option value="room 2">Room 102</option>
          <option value="room 3">Room 103</option>
        </select>

        <p className="font-semibold ml-2 text-md">Roomate Preferences (If Any):</p>
        <input
          type="text"
          className="rounded-sm py-2 border-1 border-gray-300  focus:border-blue-600 focus:outline-none w-full max-w-xsm mb-5 ml-4"
        />

        <p className="font-semibold ml-2 text-md">Additional Requests:</p>
        <input
          type="text"
          className="rounded-sm py-2 border-1 border-gray-300  focus:border-blue-600 focus:outline-none w-full max-w-xsm mb-15 ml-4"
        />

        <Link href="/booking/payment">
          <div className="flex justify-center mb-5">
            <button className="rounded bg-red-500 cursor-pointer hover:bg-red-400 active:bg-red-500 active:scale-x-95 text-white p-3 w-full max-w-lg">
              Proceed To Payment
            </button>
          </div>
        </Link>


      </div>
    </>

  );
}