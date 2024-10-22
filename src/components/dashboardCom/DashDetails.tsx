import { useEffect, useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TransactionHistory, WalletCard } from "../../components";

const DashDetails = () => {
  return (
    <div className="w-full text-dark font-inter pt-[9.5rem] pb-[8rem] md:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]">
      <div className="flex flex-col llg:flex-row gap-6 xl:gap-10">
        {/* side 1 */}
        <div className="w-full">
          {/* note header */}
          <div className=" bg-lemongreen rounded-2xl relative h-[20rem] px-4 sm:px-10 flex flex-col sm:justify-center text-left overflow-hidden">
            {/* header text */}
            <h1 className=" text-greens sm:text-2xl xl:text-3xl font-bold flex flex-col mt-7 sm:mt-0">
              Early Protection <span>for your family health</span>
            </h1>

            {/* paragrapg */}
            <p className="text-[#3F3F3F] text-sm sm:text-lg xl:text-xl mt-4 w-full sm:w-[45%] xl:w-[50%]">
              Have a regular checkup to prevent any complications
            </p>

            {/* img */}
            <div className="absolute right-0 -bottom-10 sm:right-10 sm:bottom-0 -rotate-[2deg]">
              <img
                className="w-full h-full object-cover"
                src="/img2.png"
                alt=""
              />
            </div>
          </div>

          {/* buttoms */}
          <div className="mt-16">
            {/* doctor */}
            <button className=" bg-greens text-white font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center border border-greens">
              {/* img */}
              <div className=" w-[3rem] rounded-full grid items-center justify-center aspect-square bg-white">
                <img className=" " src="/profile-add.png" alt="" />
              </div>
              Doctor
            </button>

            {/* ambulance */}
            <button className=" bg-white text-greens font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens">
              {/* img */}
              <div className=" w-[3rem] rounded-full grid items-center justify-center aspect-square bg-lemongreen">
                <img className=" " src="/hospital.png" alt="" />
              </div>
              Doctor
            </button>
          </div>

          {/* notification card */}
          <div className="mt-16">
            <div className="bg-white shadow-lg rounded-lg">
              {/* head */}
              <div className="flex items-center justify-between px-4 sm:px-10 py-7">
                <p className="font-bold sm:text-xl xl:text-2xl">
                  Notifications
                </p>
                <Link to={""} className="text-greens font-medium ">
                  See all
                </Link>
              </div>

              {/* notiii */}
              <div className=" border-t px-4 sm:px-10 py-7">
                {/* info */}
                <div className="flex items-center justify-between">
                  {/* text */}
                  <div>
                    {/* text 1 */}
                    <div className="flex gap-4">
                      {/* icon */}
                      <div>
                        <img src="/success.png" alt="" />
                      </div>
                      {/* text */}
                      <p className="grid xl:text-lg font-bold">
                        Card successfully saved{" "}
                        <span className="font-normal text-textgray mt-1 text-xs sm:text-base">
                          VISA 1234 has been added to your account
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* close */}
                  <button className="">
                    <img src="/close.png" alt="" />
                  </button>
                </div>

                {/* info */}
                <p className="text-center text-[#EE9621] font-semibold mt-14">
                  View Cards
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* side 2 */}
        <div className="mt-10 llg:mt-0 w-full md:w-[70%] mx-auto">
          {/* wallet card */}
          <WalletCard />

          {/* transaction history */}
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default DashDetails;
