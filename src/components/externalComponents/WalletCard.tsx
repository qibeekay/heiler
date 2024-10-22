import React, { useEffect, useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { GetAccountData, GetBalance } from "../../api/wallet";
import Loader from "../loader/Loader";
import { toast, ToastContainer } from "react-toastify";

const WalletCard = () => {
  const [usertoken, setUsertoken] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [acctNo, setAcctNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  // Function to open the modal
  const openModal = () => {
    setModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModal(false);
    setCopySuccess("");
  };

  useEffect(() => {
    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  const getAccountData = async () => {
    const res = await GetAccountData(usertoken);
    setBankName(res[0].bank_name);
    setAcctNo(res[0].nuban);
  };

  const getUserBalance = async () => {
    setLoading(true);
    const res = await GetBalance(usertoken);
    setBalance(res?.balance_th);
    if (res) {
      setLoading(false);
    }
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard
      .writeText(acctNo)
      .then(() => {
        toast.info("Text Copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
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
          <p className="flex items-center gap-4">
            NGN {loading ? <Loader /> : balance}
          </p>
          {/* eye */}
          <IoEyeOffSharp />
        </div>
      </div>

      {/* button */}
      <div className="flex flex-col sm:flex-row items-center gap-x-4 w-full">
        <button
          className=" bg-white text-greens font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens"
          onClick={openModal}
        >
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

      {modal && (
        <div className="w-full min-h-screen bg-black/25 fixed left-0 top-0 z-[100] flex flex-col items-center justify-center">
          <div className="w-[345px] bg-white rounded-lg p-[24px] flex flex-col gap-7 my-[2.5rem] relative overflow-hidden">
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <p className=" text-[#474747]/60">Account Number</p>
                <p
                  className=" text-[#474747] font-bold cursor-pointer"
                  onClick={handleCopyAccountNumber}
                >
                  {acctNo}{" "}
                  {/* {copySuccess && (
                    <span className="text-green-500 text-sm">
                      {copySuccess}
                    </span>
                  )} */}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className=" text-[#474747]/60">Bank Name</p>
                <p className=" text-[#474747] font-bold">{bankName}</p>
              </div>
            </div>

            {/* cancel */}
            <div className="w-full flex items-center justify-center mt-2">
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default WalletCard;
