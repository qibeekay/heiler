import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useConverstion } from "../useConversation";
import { useEffect, useState } from "react";
import { GetUserChat } from "../../api/chat";
import FormatTime from "../../utils/formatTime";
import Loader from "../loader/Loader";
import * as emoji from "node-emoji";
import { GetChatNotification } from "../../api/notification";

interface RecipientData {
  mail: string;
  token: string;
  phone: string;
  firstName: string;
  lastName: string;
  photo: string;
  specialty_name: string;
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

const UsersList = () => {
  const [usertoken, setUsertoken] = useState("");
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { isActive } = useConverstion();
  // console.log(isActive);

  useEffect(() => {
    // Fetch mail from localStorage when the component mounts
    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  const getUserChats = async () => {
    // Retrieve chat data from localStorage
    const storedChats = JSON.parse(localStorage.getItem("chats") || "[]");

    if (storedChats.length > 0) {
      setChats(storedChats); // Set chats from localStorage if they exist
      setIsLoading(false); // Stop loader as we have initial data

      try {
        // Fetch new data from the API to check for new chat objects
        const res = await GetUserChat(usertoken);

        // Identify any new chats not already in local storage
        const newChats = res.filter(
          (newChat: ChatResponse) =>
            !storedChats.some(
              (storedChat: ChatResponse) =>
                storedChat.recipient === newChat.recipient
            )
        );

        if (newChats.length > 0) {
          const updatedChats = [...storedChats, ...newChats];
          setChats(updatedChats);
          localStorage.setItem("chats", JSON.stringify(updatedChats)); // Update localStorage with new data
        }
      } catch (error) {
        console.error("Error fetching new chats:", error);
      }
    } else {
      // If no data in localStorage, load from API and show loader
      setIsLoading(true);
      try {
        const res = await GetUserChat(usertoken);
        setChats(res);
        localStorage.setItem("chats", JSON.stringify(res));
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoading(false); // Stop loader once done
      }
    }
  };

  useEffect(() => {
    if (usertoken) {
      getUserChats();
    }
  }, [usertoken]);

  const singleMessege = (chat: ChatResponse) => {
    navigate(`/chats/${chat.recipientData.token}`, {
      state: { chat, isNewChat: false },
    });
  };

  // Truncate message with dynamic maxLength based on screen size
  const truncateMessage = (message: string, maxLength: number) => {
    if (message.length > maxLength) {
      return message.slice(0, maxLength) + "...";
    }
    return message;
  };

  // Define the dynamic maxLength based on screen size
  const getTruncateLength = () => {
    if (window.innerWidth <= 350) return 30; // Smaller length for smaller screens
    return 50; // Default length for larger screens
  };

  return (
    <div
      className={`${
        isActive ? "hidden lg:block" : "block"
      } w-full lg:w-[70%] shadow-right-only bg-white p-4 llg:p-7 relative`}
    >
      {/* search and add users */}
      <div className="w-full relative bg-white">
        <div className="flex items-center justify-between gap-10">
          {/* add */}
          <button>
            <img src="/newchat.png" alt="" />
          </button>

          {/* input field */}
          <div className="w-full">
            <div className=" shadow-lg bg-white flex gap-2 p-4 w-full rounded-md">
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
          {/* edit */}
          <button>Edit</button>
        </div>
      </div>

      {/* users/chat details */}
      <div className=" mt-10 overflow-y-scroll h-[76%] lg:h-[88%]">
        {isLoading ? (
          <div className="w-full grid items-center justify-center mt-10">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col gap-5 sm:gap-4">
            {chats?.map((chat, index) => (
              <button
                key={index}
                className="flex items-center gap-4 hover:bg-blue-gray-100 p-1 sm:p-2"
                onClick={() => {
                  singleMessege(chat);
                }}
              >
                {/* imgae */}
                <div className="w-[3rem] md:w-[4rem]">
                  <div className=" w-[2.5rem] md:w-[3.5rem] aspect-square rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={chat?.recipientData?.photo || "/doctors.jpg"}
                      alt={chat?.recipientData?.firstName}
                    />
                  </div>
                </div>
                {/* details */}
                <div className="w-full">
                  {/* name/field */}
                  <div className="flex w-full justify-between">
                    <div className="flex items-center gap-2 md:w-[18rem] overflow-hidden whitespace-nowrap">
                      <p className="text-sm sm:text-base md:text-lg font-semibold">
                        {chat?.recipientData.firstName}{" "}
                        {chat?.recipientData.lastName}
                      </p>

                      {chat?.recipientData.specialty_name && (
                        <p className="text-[8px] hidden xs:block text-white sm:text-sm bg-[#4485FD] px-1 rounded-2xl">
                          {chat?.recipientData?.specialty_name || ""}
                        </p>
                      )}
                    </div>
                    <p className="text-[10px] sm:text-sm md:text-base text-[#707991]">
                      {FormatTime(chat?.lastMessage.timestamp)}
                    </p>
                  </div>
                  {/* label/count */}
                  <div className="flex w-full justify-between gap-4 md:mt-1 items-center">
                    <p className="text-xs sm:text-sm md:text-base text-[#707991]">
                      {truncateMessage(
                        emoji.emojify(chat?.lastMessage?.message),
                        getTruncateLength()
                      )}
                    </p>
                    <div>
                      <div className="grid items-center justify-center bg-greens w-2 lg:w-2 aspect-square rounded-full">
                        <p className="text-white text-[10px] lg:text-xs"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
