import DashboardWrapper from '@/components/DashboardWrapper';

export default function EditProfilePage() {
  return (
    <DashboardWrapper>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        <form className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="p-3 border rounded"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="p-3 border rounded"
            />
          </div>

          {/* Student ID */}
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            className="p-3 border rounded w-full"
          />

          {/* Gender */}
          <select
            name="gender"
            defaultValue=""
            className="p-3 border rounded w-full"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 border rounded w-full"
          />

          {/* Contact Number */}
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            className="p-3 border rounded w-full"
          />

          {/* Program of Study */}
          <input
            type="text"
            name="program"
            placeholder="Program of Study"
            className="p-3 border rounded w-full"
          />

          {/* Level */}
          <input
            type="text"
            name="level"
            placeholder="Level"
            className="p-3 border rounded w-full"
          />

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardWrapper>
  );
}
