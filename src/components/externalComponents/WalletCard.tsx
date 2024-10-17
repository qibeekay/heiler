import React, { useEffect, useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { GetAccountData, GetBalance } from "../../api/wallet";

const WalletCard = () => {
  const [usertoken, setUsertoken] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  const getAccountData = async () => {
    const res = await GetAccountData(usertoken);
    console.log(res);
  };

  const getUserBalance = async () => {
    const res = await GetBalance(usertoken);
    setBalance(res?.balance_th);
  };

  useEffect(() => {
    if (usertoken) {
      getAccountData();
      getUserBalance();
    }
  }, [usertoken]);

  return (
    <div>
      {/* wallet */}
      <div className="rounded-2xl bg-greens h-[13rem] text-white p-4 sm:p-10 font-roboto flex flex-col justify-center sm:block">
        {/* balance */}
        <p className="text-lg xl:text-xl">My Balance</p>
        {/* amount */}
        <div className="w-full flex items-center font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl justify-between text-white/80 mt-5 sm:mt-7">
          <p>NGN {balance}</p>
          {/* eye */}
          <IoEyeOffSharp />
        </div>
      </div>

      {/* button */}
      <div className="flex flex-col sm:flex-row items-center gap-x-4 w-full">
        <button className=" bg-white text-greens font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens">
          {/* img */}
          <div className=" w-[3rem] rounded-full grid items-center justify-center aspect-square bg-lemongreen">
            <img className=" " src="/hospital.png" alt="" />
          </div>
          Add Money
        </button>

        <button className=" bg-greens text-white font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens">
          {/* img */}
          <div className=" w-[3rem] rounded-full grid items-center justify-center aspect-square bg-lemongreen">
            <img className=" " src="/hospital.png" alt="" />
          </div>
          Send Money
        </button>
      </div>
    </div>
  );
};

export default WalletCard;
