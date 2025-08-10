import DashboardWrapper from '@/components/DashboardWrapper';

export default function EditPasswordPage() {
  return (
    <DashboardWrapper>
      <div className="max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Edit Password</h1>

        <form className="space-y-4">
          {/* Current Password */}
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            className="p-3 border rounded w-full"
            autoComplete="current-password"
          />

          {/* New Password */}
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="p-3 border rounded w-full"
            autoComplete="new-password"
          />

          {/* Confirm New Password */}
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            className="p-3 border rounded w-full"
            autoComplete="new-password"
          />

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </DashboardWrapper>
  );
}
