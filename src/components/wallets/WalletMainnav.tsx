import { Header, WalletCard } from "../../components";

const WalletMainnav = () => {
  return (
    <div className="w-full lg:w-[82%] xll:w-[85%] bg-white">
      <Header title="Patients" />
      <div className="font-inter text-dark w-full pt-8 pb-[8rem] lg:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]">
        <div className=" w-full mt-[7rem]">
          <WalletCard />
        </div>
      </div>
    </div>
  );
};

export default WalletMainnav;
