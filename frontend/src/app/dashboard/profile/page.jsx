'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardWrapper from '@/components/DashboardWrapper';
import { Plus } from 'lucide-react';

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

  const profileData = {
    firstName: 'John',
    lastName: 'Doe',
    id: 'STU2024001',
    gender: 'Male',
    email: 'john.doe@example.com',
    contactNumber: '+233 24 123 4567',
    programOfStudy: 'BSc. Computer Science',
    level: '300',
    profilePhoto: null
  }

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
                <Plus size={40} />
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

        {/* Profile */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-20'>
          <div className='flex flex-col'>
            <div className='font-bold'>First Name:</div>
            <div>{profileData.firstName}</div>
          </div>

          <div className='flex flex-col'>
            <div className='font-bold'>Last Name:</div>
            <div>{profileData.lastName}</div>
          </div>

          <div className='flex flex-col'>
            <div className='font-bold'>ID:</div>
            <div>{profileData.id}</div>
          </div>

          <div className='flex flex-col'>
            <div className='font-bold'>Gender:</div>
            <div>{profileData.gender}</div>
          </div>

          <div className='flex flex-col'>
            <div className='font-bold'>email:</div>
            <div>{profileData.email}</div>
          </div>

          <div className='flex flex-col'>
            <div className='font-bold'>Contact Number:</div>
            <div>{profileData.contactNumber}</div>
          </div>

          <div className='flex flex-col'>
            <div className='font-bold'>Program Of Study:</div>
            <div>{profileData.programOfStudy}</div>
          </div>

          <div className='flex flex-col'>
            <div className='font-bold'>Level:</div>
            <div>{profileData.level}</div>
          </div>
        </div>


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
