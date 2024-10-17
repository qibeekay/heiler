import { FpMainnav, SideNav } from "../../components";

const FindPatientsPage = () => {
  return (
    <div>
      {/* side nav */}
      <SideNav />

      {/* mainnave */}
      <div className="flex justify-end">
        <FpMainnav />
      </div>
    </div>
  );
};

export default FindPatientsPage;
