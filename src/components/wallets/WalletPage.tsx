import { SideNav, WalletMainnav } from "../../components";
const WalletPage = () => {
  return (
    <div>
      <SideNav />
      <div className="flex justify-end">
        <WalletMainnav />
      </div>
    </div>
  );
};

export default WalletPage;
