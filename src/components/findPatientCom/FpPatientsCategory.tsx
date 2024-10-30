import { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi2";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { GetUserChat } from "../../api/chat";
import Loader from "../loader/Loader";

interface RecipientData {
  mail: string;
  token: string;
  phone: string;
  firstName: string;
  lastName: string;
}

interface LastMessage {
  sender: string;
  token: string;
  recipient: string;
  timestamp: number;
  time_day: string;
  time_month: string;
  time_year: string;
  message: string;
}

interface ChatResponse {
  recipient: string;
  recipientData: RecipientData;
  lastMessage: LastMessage;
}
const FpPatientsCategory = () => {
  const [usertoken, setUsertoken] = useState("");
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Fetch mail from localStorage when the component mounts
    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  const getUserChats = async () => {
    setIsLoading(true);
    try {
      const res = await GetUserChat(usertoken);
      setChats(res);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (usertoken) {
      getUserChats();
    }
  }, [usertoken]);

  const patientRecord = (id: string) => {
    navigate(`/find-patient/${id}`);
  };

  const startChat = (patient: RecipientData) => {
    navigate(`/chats/${patient.token}`, {
      state: { patient, isNewChat: true },
    });
  };
  return (
    <div className="font-inter text-dark w-full pt-8 pb-[8rem] lg:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]">
      <div className=" w-full mt-[7rem]">
        {/* search */}
        <div className="px-4 sm:px-8 xl:px-[5rem] mt-[8rem]">
          <div className="flex items-center justify-between">
            {/* back */}
            <button className="flex items-center gap-2" onClick={handleback}>
              <HiChevronLeft />
              <p>Back</p>
            </button>

            {/* search */}
            <div>
              <div className=" shadow-lg bg-white flex flex-col gap-2 p-4 w-full md:w-[30rem] rounded-md">
                {/* icons */}
                <button>
                  <RiSearch2Line />
                </button>
                {/* input */}
                <input
                  type="text"
                  className="w-full outline-none bg-transparent h-full"
                  placeholder="Search anything..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* doctors chat */}
        {isLoading ? (
          <div className="w-full grid items-center justify-center mt-10">
            <Loader />
          </div>
        ) : (
          <>
            {chats.length === 0 ? (
              <div>
                <p>No Patients Avalaible</p>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-[5rem]">
                {chats?.map((patient, index) => (
                  <div
                    key={index}
                    className="border shadow rounded-md py-6 px-8 bg-white w-full"
                  >
                    <div className="flex gap-2">
                      {/* profile */}
                      <div className="">
                        <div className="w-[106px] h-[106px] rounded-full overflow-hidden bg-[#fafafa]">
                          <img
                            className="w-full h-full object-cover"
                            src="/doctors.jpg"
                            alt=""
                          />
                        </div>
                      </div>

                      {/* text */}
                      <div className="w-full flex flex-col gap-y-3">
                        <div className="flex items-center justify-between">
                          <h1 className="text-[21px] font-bold text-[#0D1B34]">
                            Dr. {patient.recipientData.firstName}{" "}
                            {patient.recipientData.lastName}
                          </h1>
                          {/* <p className='text-greens font-semibold text-base'>
											Specialist
										</p> */}
                        </div>
                        <p className="text-[#A3B1AA]">Online</p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center gap-4 mt-6">
                      <button
                        className="bg-greens border border-greens text-white w-full py-4 rounded-md"
                        onClick={() => {
                          patientRecord(patient.recipientData.token);
                        }}
                      >
                        View Medical Record
                      </button>
                      <button
                        className="bg-white border border-greens text-greens w-full py-4 rounded-md"
                        onClick={() => {
                          startChat(patient.recipientData);
                        }}
                      >
                        Start Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FpPatientsCategory;
