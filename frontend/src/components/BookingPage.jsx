'use client';
import BookingWrapper from "@/components/BookingWrapper";
import { useState } from "react";
import api from "@/lib/api";
import { Upload, CheckLine, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();
  const [loading, setLoadiing] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Student Information for Registration
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    contactNumber: '',
    program: '',
    level: '',
    gender: '',

    // Admission Letter
    admissionLetter: null,

    // Room Preferences for Booking
    roomType: '2-in-a-room',
    roomNumber: '', // Will be selected or assigned

    // Booking specific
    bookingType: 'academic-year',
    academicYear: '2024/2025',
    duration: 9 // months
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, admissionLetter: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Step 1: Register the user
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        studentId: formData.studentId,
        contactNumber: formData.contactNumber,
        program: formData.program,
        level: formData.level,
        gender: formData.gender,
        role: 'student' // Explicitly set role
      };

      const registerResponse = await api.post('/register', registerData);

      // Store token from registration
      const token = registerResponse.data.token;
      localStorage.setItem('auth-token', token);

      // Step 2: Get available rooms based on room type preference
      const roomsResponse = await api.get(`/rooms/available?type=${formData.roomType}`);
      const availableRooms = roomsResponse.data;

      if (availableRooms.length === 0) {
        setError('No rooms available for your selected preference');
        setLoading(false);
        return;
      }

      // Step 3: Create booking request
      const bookingData = {
        roomId: availableRooms[0].id, // Select first available room
        roomNumber: availableRooms[0].roomNumber,
        bookingType: formData.bookingType,
        academicYear: formData.academicYear,
        duration: formData.duration,
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(Date.now() + (formData.duration * 30 * 24 * 60 * 60 * 1000)).toISOString()
      };

      const bookingResponse = await api.post('/bookings/request', bookingData);

      // Store booking details
      localStorage.setItem('booking', JSON.stringify(bookingResponse.data));

      // Upload admission letter if provided
      if (formData.admissionLetter) {
        const uploadData = new FormData();
        uploadData.append('admissionLetter', formData.admissionLetter);
        uploadData.append('bookingId', bookingResponse.data.id);

        await api.post('/documents/upload', uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Redirect to payment page
      router.push('/booking/payment');

    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.message || 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Room type pricing
  const roomPricing = {
    '4-in-a-room': 3000,
    '3-in-a-room': 4000,
    '2-in-a-room': 5000,
    '1-in-a-room': 7000
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="font-bold mb-10">Student Information</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Student ID</label>
            <input
              type="text"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your Student ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your contact"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border border-gray-300 w-full p-2 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="border-gray-300 w-full p-2 border rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm"
              required
            >
              <option value="">Select your level</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Program Of Study</label>
            <input
              type="text"
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              className="w-full p-2 border-gray-300 border rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter your program of study"
              required
            />
          </div>

          <div className="relative">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm"
                placeholder="Create a six digit password"
                required
                minLength="6"
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

        {/* Room Preferences */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Room Preference</h3>
          <div className="space-y-3">
            {Object.entries(roomPricing).map(([type, price]) => (
              <label key={type} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="roomType"
                  value={type}
                  checked={formData.roomType === type}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="mr-3"
                />
                <div className="flex-1">
                  <p className="font-medium capitalize">{type.replace('-', ' ')}</p>
                  <p className="text-sm text-gray-600">GHS {price.toLocaleString()} per academic year</p>
                </div>
                {formData.roomType === type && (
                  <span className="text-blue-600 font-medium">Selected</span>
                )}
              </label>
            ))}
          </div>

          {/* Show selected room price */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">
                GHS {roomPricing[formData.roomType].toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">For 9 months (Academic Year 2024/2025)</p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <label className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 mr-3"
              required
            />
            <span className="text-sm text-gray-700">
              I agree to the hostel rules and regulations. I understand that this booking is subject to
              availability and payment confirmation. *
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-red-500 cursor-pointer hover:bg-red-400 active:bg-red-500 active:scale-x-95 text-white p-3 w-full max-w-lg"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Processing Booking Request...
            </>
          ) : (
            'Proceed to Payment'
          )}
        </button>
        </div>
      </form>

    </>

  );
}