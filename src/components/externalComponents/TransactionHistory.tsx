import React from "react";
import { Link } from "react-router-dom";

const TransactionHistory = () => {
  return (
    <div className="mt-16">
      {/* head */}
      <div className="bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between px-4 sm:px-10 py-7">
          <p className="font-bold sm:text-xl xl:text-2xl">
            Transaction History
          </p>
          <Link to={""} className="text-greens font-medium ">
            See all
          </Link>
        </div>

        {/* history */}
        <div className="px-4 sm:px-10 py-10 grid gap-10">
          {/* success */}
          <div className="flex flex-col xs:flex-row xs:items-center justify-between">
            {/* text */}
            <div>
              {/* text 1 */}
              <div className="flex items-center gap-4">
                {/* icon */}
                <div className=" w-[3rem] aspect-square grid items-center justify-center rounded-xl bg-lemongreen">
                  <img className="" src="/credit.png" alt="" />
                </div>
                {/* text */}
                <p className="grid xl:text-lg font-bold">
                  Wallet Top-up
                  <span className="font-normal text-textgray mt-1 text-base">
                    14 Aug, 2022
                  </span>
                </p>
              </div>
            </div>

            {/* amount */}
            <div className=" text-greens flex gap-2 items-center justify-end mt-2 xs:mt-0 xs:justify-center">
              {/* image */}
              <div>
                <img src="/nairagreen.png" alt="" />
              </div>
              <p className="font-bold sm:text-lg">10,000</p>
            </div>
          </div>

          {/* danger */}
          <div className="flex flex-col xs:flex-row xs:items-center justify-between">
            {/* text */}
            <div>
              {/* text 1 */}
              <div className="flex items-center gap-4">
                {/* icon */}
                <div className=" w-[3rem] aspect-square grid items-center justify-center rounded-xl bg-[#FFF5F4]">
                  <img className="" src="/debit.png" alt="" />
                </div>
                {/* text */}
                <p className="grid xl:text-lg font-bold">
                  Wallet Top-up
                  <span className="font-normal text-textgray mt-1 text-base">
                    14 Aug, 2022
                  </span>
                </p>
              </div>
            </div>

            {/* amount */}
            <div className=" text-[#E63E3E] flex gap-2 items-center justify-end mt-2 xs:mt-0 xs:justify-center">
              {/* image */}
              <div>
                <img src="/nairared.png" alt="" />
              </div>
              <p className="font-bold sm:text-lg">10,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
