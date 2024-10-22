import { useEffect, useState } from "react";
import { GetPackages, Subscribe } from "../../api/wallet";
import Loader from "../loader/Loader";
import { ToastContainer } from "react-toastify";

interface packages {
  id: number;
  name: string;
  token: string;
  amount: string;
  usertoken: string;
}

interface props {
  open: any;
  pkgs: packages[];
}

const SubscribeTab = ({ open, pkgs }: props) => {
  return (
    <div className="flex flex-col gap-[20px] relative max-w-[327px] mx-auto">
      {pkgs?.map((pkg) => (
        <div
          key={pkg?.id}
          className="relative group bg-white text-dark hover:bg-greens  rounded-[20px] py-[40px] px-[24px] border shadow"
        >
          <div>
            {/* header */}
            <div className="text-center border-b pb-2">
              <p className="text-greens group-hover:text-white font-bold capitalize">
                {pkg?.name}
              </p>
              <p className="flex items-center justify-center text-[28px] font-bold text-[#4D4D4D] group-hover:text-white">
                NGN {pkg?.amount}{" "}
                <span className=" font-normal text-xs group-hover:text-white text-[#9c9c9c]">
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
            className="rounded outline-none group-hover:text-white text-greens font-bold text-sm w-full max-w-[430px] mx-auto mt-4"
            onClick={() => open(pkg?.token)}
          >
            Buy Now
          </button>
        </div>
      ))}

      <ToastContainer />
    </div>
  );
};

export default SubscribeTab;
