import { FormEvent, useEffect, useState } from "react";
import { BvnTab, Header, SubscribeTab } from "../../components";
import { VerifyBvn } from "../../api/kyc";
import { GetPackages } from "../../api/wallet";

const MoreMainnav = () => {
  const [usertoken, setUsertoken] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [showTabs, setShowTabs] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleIdentificationClick = () => {
    setShowTabs(!showTabs); // Toggle the visibility of the tabs
  };

  useEffect(() => {
    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  return (
    <div className="w-full lg:w-[82%] xll:w-[85%] bg-white">
      <Header title="Patients" />
      <div className="font-inter text-dark w-full pt-8 pb-[8rem] lg:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]">
        <div className=" w-full mt-[7rem]">
          <div className="flex gap-10">
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
              {activeTab === "4" && <SubscribeTab usertoken={usertoken} />}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreMainnav;
