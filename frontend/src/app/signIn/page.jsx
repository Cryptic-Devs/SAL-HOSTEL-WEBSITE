'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BookingWrapper from '@/components/BookingWrapper';
import Link from 'next/link';
import api from '@/lib/api';

const SignIn = () => {
  const router = useRouter();

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateStudentId = (id) => {
    const isValid = /^\d{8}$/.test(id);
    setIdError(isValid ? '' : 'Student ID must be exactly 8 digits.');
    return isValid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateStudentId(studentId)) return;

    setLoading(true);
    try {
      // Call backend login API
      const response = await api.post('/login', {
        studentId,
        password,
      });

      // Store token in localStorage
      localStorage.setItem('auth-token', response.data.token);

      // Fetch user profile
      const profileResponse = await api.get('/profile');
      localStorage.setItem('user', JSON.stringify(profileResponse.data));

      // Redirect based on role
      if (profileResponse.data.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.response?.data?.message || 'Invalid ID or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingWrapper subTitle="Sign In">
      <div className="flex flex-col justify-center items-center w-full min-h-screen px-6">
        <div className="w-full max-w-xl bg-white p-10 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            SAL HOSTEL STUDENT PORTAL
          </h2>

          <form onSubmit={handleSignIn} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Student ID
              </label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                maxLength={8}
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value);
                  validateStudentId(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your ID"
              />
              {idError && <p className="text-red-500 text-sm mt-1">{idError}</p>}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <Link href="/forgot-password">
                <span className="text-blue-600 hover:underline text-sm">
                  Forgot Password?
                </span>
              </Link>
            </div>

            <div className="text-center text-sm text-gray-600">
              Not a Resident? Click{' '}
              <Link href="/booking">
                <span className="text-blue-600 hover:underline">here</span>
              </Link>{' '}
              to book a room.
            </div>
          </form>
        </div>
      </div>
    </BookingWrapper>
  );
};

export default SignIn;
