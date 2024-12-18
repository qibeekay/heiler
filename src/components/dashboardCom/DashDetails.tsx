import { useEffect, useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  AmbulanceModal,
  TransactionHistory,
  WalletCard,
} from "../../components";

const DashDetails = () => {
  const [usertype, setUsertype] = useState<string | "">("");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // Fetch mail from localStorage when the component mounts
    const userType = localStorage.getItem("type")?.trim();
    if (userType) {
      const cleanedUserType = userType.replace(/"/g, "");
      setUsertype(cleanedUserType);
    }
  }, []);

  // Function to open the modal
  const openModal = () => {
    setModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModal(false);
  };

  const handleClick = () => {
    navigate(usertype === "User" ? "/find-doctor" : "/find-patient");
  };

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
            <button
              className=" bg-greens text-white font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center border border-greens"
              onClick={handleClick}
            >
              {/* img */}
              <div className=" w-[3rem] rounded-full grid items-center justify-center aspect-square bg-white">
                <img className=" " src="/profile-add.png" alt="" />
              </div>
              {usertype === "User" ? "Doctor" : "Patient"}
            </button>

            {/* ambulance */}
            <button
              className=" bg-white text-greens font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens"
              onClick={openModal}
            >
              {/* img */}
              <div className=" w-[3rem] rounded-full grid items-center justify-center aspect-square bg-lemongreen">
                <img className=" " src="/hospital.png" alt="" />
              </div>
              Ambulance
            </button>
          </div>
        </div>

        {/* side 2 */}
        <div className="mt-10 llg:mt-0 w-full md:w-[70%] mx-auto">
          {/* wallet card */}
          <WalletCard />

          {/* transaction history */}
          {/* <TransactionHistory /> */}

          {/* modal */}
          {modal && <AmbulanceModal close={closeModal} />}
        </div>
      </div>
    </div>
  );
};

export default DashDetails;
