'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardWrapper from '@/components/DashboardWrapper';

export default function ProfilePage() {
  const router = useRouter();

  // State for profile photo preview
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Handle photo upload & preview
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a local URL to preview
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  // Navigate to edit pages
  const goToEditProfile = () => {
    router.push('/dashboard/profile/edit-profile');
  };

  const goToEditPassword = () => {
    router.push('/dashboard/profile/edit-password');
  };

  return (
    <DashboardWrapper>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 rounded-full bg-gray-200 overflow-hidden cursor-pointer border-2 border-gray-400">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-sm">Add Photo</span>
              </div>
            )}
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Add profile photo"
            />
          </div>
        </div>

        {/* Profile Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="p-3 border rounded"
              name="firstName"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-3 border rounded"
              name="lastName"
            />
          </div>

          <input
            type="text"
            placeholder="Student ID"
            className="p-3 border rounded w-full"
            name="studentId"
          />

          <select
            className="p-3 border rounded w-full"
            name="gender"
            defaultValue=""
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded w-full"
            name="email"
          />

          <input
            type="tel"
            placeholder="Contact Number"
            className="p-3 border rounded w-full"
            name="contactNumber"
          />

          <input
            type="text"
            placeholder="Program of Study"
            className="p-3 border rounded w-full"
            name="program"
          />

          <input
            type="text"
            placeholder="Level"
            className="p-3 border rounded w-full"
            name="level"
          />
        </form>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={goToEditProfile}
            className="flex-1 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
          <button
            onClick={goToEditPassword}
            className="flex-1 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Edit Password
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
}
