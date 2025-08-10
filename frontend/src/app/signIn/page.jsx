import Image from 'next/image'

export default function SignIn() {
  return (
    <div className="flex h-screen">
      <div
        className="w-1/3 bg-cover bg-center"
        style={{ backgroundImage: "url('/sal-frontview.png')" }}
      >
        <div className="absolute left-10 text-white space-y-2 bg-opacity-50 rounded">
          <h1 className="text-3xl font-bold">Sal Hostel</h1>
          <p className="text-1xl">Sign In</p>
        </div>
      </div>
       <div className="w-2/3 flex flex-col justify-center items-center bg-[#fcf8f9] px-8">
        <div className="w-full max-w-md">
          <a href="#" className="text-sm mb-6 inline-block text-black hover:underline">
            ← Go Back
          </a>
          <h1 className="text-2xl font-bold text-center mb-8">SAL HOSTEL STUDENT PORTAL</h1>

          <form className="space-y-6">
            <div>
              <label htmlFor="studentID" className="block text-sm font-medium text-gray-700">
                Student ID
              </label>
              <input
                type="text"
                id="studentID"
                name="studentID"
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-lg font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            <a href="#" className="text-gray-700 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="text-center mt-2 text-sm">
            Not a Resident? Click{' '}
            <a href="#" className="text-blue-600 hover:underline">
              here
            </a>{' '}
            to book a room.
          </div>
        </div>
      </div>
    </div>
  );
}