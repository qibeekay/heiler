import { MoreMainnav, SideNav } from "../../components";

const MorePage = () => {
  return (
    <div>
      <SideNav />
      <div className="flex justify-end">
        <MoreMainnav />
      </div>
    </div>
  );
};

export default MorePage;
