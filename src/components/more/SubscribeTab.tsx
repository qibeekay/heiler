import { useEffect, useState } from "react";
import { GetPackages, Subscribe } from "../../api/wallet";
import Loader from "../loader/Loader";

interface packages {
  id: number;
  name: string;
  token: string;
  amount: string;
  usertoken: string;
}

const SubscribeTab = ({ usertoken }: { usertoken: string }) => {
  const [pkgs, setPkgs] = useState<packages[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // get packages
  const getPackages = async () => {
    const res = await GetPackages();
    setPkgs(res);
  };

  useEffect(() => {
    getPackages();
  }, []);

  // subscribe for a package
  const subscribe = async (token: string) => {
    setIsLoading(true);
    const payload = { usertoken: usertoken, token };
    try {
      const res = await Subscribe(payload);
      // setChats(res);
      console.log(res);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-[20px]">
      {pkgs?.map((pkg) => (
        <div
          key={pkg?.id}
          className="relative bg-[#F5F5F5] rounded-[20px] py-[40px] px-[24px]"
        >
          <div>
            {/* header */}
            <div className="text-center">
              <p className="text-greens font-bold capitalize">{pkg?.name}</p>
              <p className="flex items-center justify-center text-[28px] font-bold text-[#4D4D4D]">
                NGN {pkg.amount}{" "}
                <span className=" font-normal text-xs text-[#9c9c9c]">
                  /month
                </span>
              </p>
            </div>
          </div>

          {/* absolute */}
          <div className="absolute -top-4 left-10">
            <div className="w-[30px] aspect-square bg-white grid items-center justify-center">
              <img src="/subdoor.png" alt="" />
            </div>
          </div>

          <button
            className="bg-greens rounded h-[70px] px-4 outline-none text-white mt-10 font-bold text-sm w-full max-w-[430px] mx-auto"
            onClick={() => {
              subscribe(pkg?.token);
            }}
          >
            {isLoading ? <Loader /> : "Get plan"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscribeTab;
