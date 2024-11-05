import { FormEvent, useEffect, useState } from "react";
import { BvnTab, Header, SubscribeTab } from "../../components";
import { VerifyBvn } from "../../api/kyc";
import {
  GetAccountData,
  GetBalance,
  GetPackages,
  Subscribe,
  VerifySubscription,
} from "../../api/wallet";
import { GetUserData } from "../../api/auth";
import Loader from "../loader/Loader";
import { HiChevronLeft } from "react-icons/hi2";
import { ToastContainer } from "react-toastify";

interface packages {
  id: number;
  name: string;
  token: string;
  amount: string;
  usertoken: string;
}

const MoreMainnav = () => {
  const [usertoken, setUsertoken] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [showTabs, setShowTabs] = useState(false);
  const [showAcct, setShowAcct] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [photo, setPhoto] = useState("");
  const [balance, setBalance] = useState("");
  const [acctNo, setAcctNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [modal, setModal] = useState(false);
  const [pkgs, setPkgs] = useState<packages[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // Function to open the modal
  const openModal = (token: string) => {
    setModal(true);
    setSelectedToken(token); // Set the token of the clicked package
  };

  // Function to close the modal
  const closeModal = () => {
    setModal(false);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleIdentificationClick = () => {
    setShowTabs(!showTabs); // Toggle the visibility of the tabs
  };

  const handleAcctClick = () => {
    setShowAcct(!showAcct); // Toggle the visibility of the acct
  };

  const getUserData = async () => {
    const res = await GetUserData(usertoken);
    setFirstname(res.data.firstName);
    setLastname(res.data.lastName);
    setPhoto(res.data.photo);
  };

  const getUserBalance = async () => {
    const res = await GetBalance(usertoken);
    setBalance(res?.balance_th);
  };
  const getAccountData = async () => {
    const res = await GetAccountData(usertoken);
    setBankName(res[0].bank_name);
    setAcctNo(res[0].nuban);
  };

  useEffect(() => {
    if (usertoken) {
      getUserData();
      getUserBalance();
      getAccountData();
    }
  }, [usertoken]);

  useEffect(() => {
    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  // get packages
  const getPackages = async () => {
    const res = await GetPackages();
    setPkgs(res);
  };

  useEffect(() => {
    getPackages();
  }, []);

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // subscribe for a package
  const subscribe = async (token: string) => {
    setIsLoading(true);
    const payload = { usertoken: usertoken, token };
    try {
      const res = await Subscribe(payload);
      console.log(res);
      if (res) {
        setTimeout(() => {
          handleNext();
        }, 1000);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    usertoken: "",
    packageToken: "",
    otp: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await VerifySubscription({
        ...formData,
        usertoken: usertoken,
        packageToken: selectedToken,
      });
      if (res) {
        setTimeout(() => {
          closeModal();
        }, 1000);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[82%] xll:w-[85%] bg-white">
      <Header title="Patients" />
      <div className="font-inter text-dark w-full pt-8 pb-[8rem] lg:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]">
        <div className=" w-full mt-[7rem]">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full border shadow h-fit rounded-lg p-[24px]">
              {/* Identification Section */}
              <div className="w-full flex flex-col gap-6">
                <div
                  className="py-2 px-4 cursor-pointer flex items-center justify-between"
                  onClick={handleIdentificationClick}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <img src="/identify.png" alt="" />
                    </div>
                    <p>Identification</p>
                  </div>

                  <div>
                    <img src="/chevron.png" alt="" />
                  </div>
                </div>

                {/* Conditionally show tabs based on `showTabs` */}
                {showTabs && (
                  <div className="flex gap-6 flex-col w-full">
                    {/* bvn */}
                    <button
                      className={`py-2 flex w-full items-center justify-between font-medium px-4 ${
                        activeTab === "1" ? "text-greens" : "text-[#192720]"
                      }`}
                      onClick={() => handleTabClick("1")}
                    >
                      <p className="flex items-start flex-col">
                        BVN
                        <span className="text-xs text-[#989C9A]">
                          Not verified
                        </span>
                      </p>

                      <div>
                        <img
                          src={` ${
                            activeTab === "1" ? "/info.png" : "/infoB.png"
                          }`}
                          alt=""
                        />
                      </div>
                    </button>

                    {/* id documents */}
                    <button
                      className={`py-2 flex w-full items-center justify-between font-medium px-4 ${
                        activeTab === "2" ? "text-greens" : "text-[#192720]"
                      }`}
                      onClick={() => handleTabClick("2")}
                    >
                      <p className="flex items-start flex-col">
                        Id document
                        <span className="text-xs text-[#989C9A]">
                          Not verified
                        </span>
                      </p>

                      <div>
                        <img
                          src={` ${
                            activeTab === "2" ? "/info.png" : "/infoB.png"
                          }`}
                          alt=""
                        />
                      </div>
                    </button>

                    {/* home address */}
                    <button
                      className={`py-2 flex w-full items-center justify-between font-medium px-4 ${
                        activeTab === "3" ? "text-greens" : "text-[#192720]"
                      }`}
                      onClick={() => handleTabClick("3")}
                    >
                      <p className="flex items-start flex-col">
                        Home address
                        <span className="text-xs text-[#989C9A]">
                          Not verified
                        </span>
                      </p>

                      <div>
                        <img
                          src={` ${
                            activeTab === "3" ? "/info.png" : "/infoB.png"
                          }`}
                          alt=""
                        />
                      </div>
                    </button>
                  </div>
                )}

                <div className="py-2 px-4 cursor-pointer flex items-center justify-between">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => handleTabClick("4")}
                  >
                    <div>
                      <img
                        src={` ${activeTab === "4" ? "/subG.png" : "/sub.png"}`}
                        alt=""
                      />
                    </div>
                    <p
                      className={`${
                        activeTab === "4" ? "text-greens" : "text-[#192720]"
                      }`}
                    >
                      Subscription
                    </p>
                  </button>
                </div>

                <div className="py-2 px-4 cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src="/refer.png" alt="" />
                    </div>
                    <p>Refer a friend</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="w-full border shadow p-[24px] rounded-lg">
              {activeTab === "1" && <BvnTab usertoken={usertoken} />}
              {activeTab === "2" && <div>Content for Tab 2</div>}
              {activeTab === "3" && <div>Content for Tab 3</div>}
              {activeTab === "4" && (
                <SubscribeTab pkgs={pkgs} open={openModal} />
              )}
            </div>
            {/* modal */}
            {modal && (
              <div className="w-full min-h-screen bg-black/25 absolute left-0 top-0 z-[100] flex flex-col items-center justify-center">
                <div className="w-[345px] bg-white rounded-lg p-[24px] flex flex-col gap-7 my-[2.5rem] relative overflow-hidden">
                  {/* first modal */}
                  <div
                    className={`transition-transform duration-500 ease-in-out absolute inset-0 ${
                      step === 1 ? "translate-x-0" : "-translate-x-full"
                    } ${
                      step > 1 ? "opacity-0 absolute" : "opacity-100 relative"
                    }`}
                  >
                    {/* images */}
                    <div className="flex items-center gap-3 text-base font-normal capitalize tracking-normal">
                      <div className="w-10 aspect-square rounded-md overflow-hidden ">
                        <img
                          className="w-full h-full object-cover"
                          src={photo || "/doctors.jpg"}
                          alt=""
                        />
                      </div>
                      <p className="font-bold hidden md:block">
                        {firstname} {lastname}
                      </p>
                    </div>

                    {/* balance */}
                    <div className="border py-2 px-4 flex items-center justify-between rounded-3xl mt-6">
                      <p className="text-[rgba(71, 71, 71, 0.6)]">My Balance</p>
                      <p className="text-greens font-bold">NGN {balance}</p>
                    </div>

                    {/* see account details */}
                    <div
                      className="flex items-center justify-between mt-2 cursor-pointer"
                      onClick={handleAcctClick}
                    >
                      <p className="text-xs">See Account Details</p>

                      <div>
                        <div className="">
                          <img src="/chevron.png" alt="" />
                        </div>
                      </div>
                    </div>

                    {/* show acct */}
                    {showAcct && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-[#474747]/60">
                            Account Number
                          </p>
                          <p className="text-xs text-[#474747] font-bold">
                            {acctNo}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-[#474747]/60">Bank Name</p>
                          <p className="text-xs text-[#474747] font-bold">
                            {bankName}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* paybutton */}
                    <div>
                      <button
                        className=" bg-greens text-white font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens"
                        onClick={() => {
                          if (selectedToken) {
                            subscribe(selectedToken); // Use the selected token when subscribing
                          }
                        }}
                      >
                        {isLoading ? <Loader /> : "Pay With Reni"}
                      </button>
                    </div>

                    {/* cancel */}
                    <div className="w-full flex items-center justify-center mt-2">
                      <button onClick={closeModal}>Cancel</button>
                    </div>
                  </div>

                  {/* otp modal */}
                  <div
                    className={`transition-transform duration-500 ease-in-out inset-0 ${
                      step === 2 ? "translate-x-0" : "translate-x-full"
                    } ${
                      step === 2 ? "opacity-100 relative" : "opacity-0 absolute"
                    }`}
                  >
                    <form action="">
                      {/* inputs */}
                      <div className="flex flex-col gap-4 my-[3.5rem]">
                        {/* email address */}
                        <div>
                          <input
                            className="p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]"
                            type="text"
                            required
                            placeholder="Enter your verifcation code"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* button */}
                      <button
                        className="w-full border border-greens bg-greens text-white font-bold text-lg font-inter rounded py-4 shadow-sm"
                        onClick={handleSubmit}
                      >
                        {isLoading ? <Loader /> : "Verify"}
                      </button>
                      {/* cancel */}
                      <div className="w-full flex items-center justify-center mt-2">
                        <button onClick={closeModal}>Cancel</button>
                      </div>
                    </form>
                  </div>

                  <div>
                    {step > 1 && (
                      <button
                        onClick={handlePrev}
                        className="absolute top-4 font-semibold flex items-center gap-2"
                      >
                        <HiChevronLeft />
                        Previous
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreMainnav;
