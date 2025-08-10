import DashboardWrapper from "@/components/DashboardWrapper";

export default function AvailableBeds() {
  return (
    <DashboardWrapper>
      <div className="mt-5 md:mt-20">
        <p className="mb-5">Available Rooms: 9</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <input type="text" className="border border-gray-300 w-full p-2 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter fault Details" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Room Type</label>
            <input type="text" className="border border-gray-300 w-full p-2 rounded-lg focus:border-blue-600 focus:outline-none max-w-xsm" placeholder="Enter fault Details" />
          </div>
          <button className="rounded bg-red-500 cursor-pointer hover:bg-red-400 active:bg-red-500 active:scale-x-95 text-white p-3">
            Search Rooms
          </button>
        </div>


        <div className="overflow-x-auto mt-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Floor</th>
                <th>Beds Available</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>001</th>
                <td>4 in a room</td>
                <td>Ground</td>
                <td>2</td>
              </tr>
              {/* row 2 */}
              <tr className="hover:bg-base-300">
                <th>023</th>
                <td>2 in a room</td>
                <td>2nd</td>
                <td>1</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>024</th>
                <td>2 in a room</td>
                <td>2nd</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardWrapper >
  );
}
