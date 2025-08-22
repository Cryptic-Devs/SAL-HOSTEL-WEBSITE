import DashboardWrapper from "@/components/DashboardWrapper";

export default function Policies() {
  return (
    <DashboardWrapper>
      <div className="flex flex-col gap-5 mt-5 md:mt-20">
        <h1 className="font-bold">
          SAL HOSTEL RULES AND REGULATIONS
        </h1>
        <p>These Rules and Regulations shall apply to all students residing in SAL HOSTEL, NEW BISKOYEDEN, OBUASI</p>
        <ol className="space-y-4 list-decimal list-inside">
          <li>Hostel fees paid are strictly not refundable.</li>
          <li>A student whose residential status is revoked due to indiscipline shall not be entitled to any refund.</li>
          <li>A student who vacates his/her room on his/her own during the semester shall not be entitled to any refund.</li>
          <li>The residential hostel fees cover accommodation only.</li>
          <li>
            The hostel reserves the right to conduct impromptu inspection of bedrooms/kitchens/washrooms of students for health,
            environmental and safety purposes and to check on perches. Students who obstruct these inspections shall be liable to
            disciplinary action.
          </li>
          <li>Students shall vacate their rooms in accordance with the KNUST Obuasi Campus's academic calendar.</li>
          <li>Guests are permitted from 6:00am until 10:00pm. All visitors must first report to the Security.</li>
        </ol>

      </div>
    </DashboardWrapper>
  );
}
