import { FaArrowLeft } from "react-icons/fa";
import { MdInsertDriveFile } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { init } from "emoji-mart";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ReadUserChat, SendUserChat } from "../../../api/chat";
import * as emoji from "node-emoji";
import Loader from "../../loader/Loader";
import FormatTime from "../../../utils/formatTime";
import { timeStamp } from "console";
import { IoSendSharp } from "react-icons/io5";
import { HiMiniTrash } from "react-icons/hi2";

interface Doctor {
  token: string;
  firstName: string;
  lastName: string;
  mail: string;
  timestamp: string;
}

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
  [x: string]: any;
  recipient: string;
  recipientData: RecipientData;
  lastMessage: LastMessage;
}

interface ReadResponse {
  [x: string]: any;
  id: number;
  message: string;
  recipient: string;
  sender: string;
  time_day: string;
  time_hour: string;
  time_minute: string;
  time_month: string;
  time_year: string;
  timestamp: number;
  token: string;
  image?: string;
}

interface Props {
  doctor?: Doctor;
  chat?: ChatResponse;
  onCreateCaseNote?: any;
}

// Initialize emoji data
init({ data });

const ChattingPage = ({ chat, onCreateCaseNote }: Props) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [chats, setChats] = useState<ReadResponse[]>([]);
  const [usertoken, setUsertoken] = useState("");
  const [bvnStatus, setBvnStatus] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | "">("");
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [usertype, setUsertype] = useState<string | "">("");

  const navigate = useNavigate();

  // stored chats
  useEffect(() => {
    // Load chats from local storage when the component mounts
    const storedChats = JSON.parse(localStorage.getItem("chats") || "{}");
    console.log("store", storedChats);
    // Check if chat and recipientData are defined before accessing token
    if (chat && chat.recipientData) {
      // Find the current chat using the recipient token
      const currentChat = storedChats.find(
        (storedChat: { recipientData: { token: string } }) =>
          storedChat.recipientData.token === chat.recipientData.token
      );
      console.log("current", currentChat);
      if (currentChat) {
        setChats(currentChat.read); // Load the messages from the chat
      } else {
        setChats([]); // No messages found
      }
    } else {
      setChats([]); // Reset chats if chat or recipientData is undefined
    }
  }, [chat]);

  console.log("chats", chats);

  const [formData, setFormData] = useState({
    sender: "",
    recipient: "",
    message: "",
    image: "",
    vn: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prevData) => ({ ...prevData, image: base64String }));
        setSelectedImage(base64String);
      };

      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(""); // Clear the selected image
    setFormData((prevData) => ({ ...prevData, image: "" })); // Clear image in formData
  };

  useEffect(() => {
    const userType = localStorage.getItem("type")?.trim();
    if (userType) {
      const cleanedUserType = userType.replace(/"/g, "");
      setUsertype(cleanedUserType);
    }

    const userData = localStorage.getItem("dets");
    if (userData) {
      const userObject = JSON.parse(userData);

      setBvnStatus(userObject?.isBVN);
    }

    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  const endRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the latest message
  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll whenever chats are updated
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Modify readUserChats to keep messages and add loading icon at the bottom
  const readUserChats = async () => {
    if (isInitialLoading) {
      setIsInitialLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      if (!chat || !chat.recipientData) {
        console.error("Chat or recipient data is not available.");
        return;
      }

      const res = await ReadUserChat(usertoken, chat.recipientData.token);

      setChats((prevChats) => {
        const storedChats: ChatResponse[] = JSON.parse(
          localStorage.getItem("chats") || "[]"
        );

        const currentChatIndex = storedChats.findIndex(
          (storedChat) =>
            storedChat.recipientData.token.trim() ===
            chat.recipientData.token.trim()
        );

        let newMessages = res;
        if (currentChatIndex !== -1) {
          const storedReadMessages = storedChats[currentChatIndex].read || [];

          // Filter out existing messages based on the token
          newMessages = res.filter(
            (msg: { token: string }) =>
              !storedReadMessages.some(
                (chat: { token: string }) => chat.token === msg.token
              )
          );

          // Append new messages to the stored read array
          const updatedChat = {
            ...storedChats[currentChatIndex],
            read: [...storedReadMessages, ...newMessages],
            lastMessage:
              newMessages[newMessages.length - 1] ||
              storedChats[currentChatIndex].lastMessage,
          };

          // Update local storage and state
          storedChats[currentChatIndex] = updatedChat;
        } else {
          // If no chat found, create a new one
          const newChat: ChatResponse = {
            recipient: chat.recipientData.token,
            recipientData: chat.recipientData,
            read: newMessages,
            lastMessage: newMessages[newMessages.length - 1],
          };
          storedChats.push(newChat);
        }

        localStorage.setItem("chats", JSON.stringify(storedChats));

        // Update the UI with both previous chats and new messages
        return [...prevChats, ...newMessages];
      });
    } catch (error) {
      console.error("Error reading user chats:", error);
    } finally {
      setIsRefreshing(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    if (usertoken && chat?.recipientData?.token) {
      const intervalId = setInterval(() => {
        readUserChats();
      }, 5000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [usertoken, chat?.recipientData?.token]);

  // use to send message to other users
  const sendUserChat = async (e: FormEvent) => {
    e.preventDefault();

    // Check if the message is empty
    if (!formData.message.trim() && !formData.image) {
      return; // Do not send if empty
    }

    setIsLoading(true);

    const payload = {
      ...formData,
      sender: usertoken,
      recipient: `${chat?.recipientData?.token}`, // Use optional chaining
    };

    if (!chat?.recipientData) {
      console.error("Recipient data is not available.");
      setIsLoading(false);
      return; // Early return if recipientData is not defined
    }

    try {
      const res = await SendUserChat(payload);

      // Update local state
      setChats((prevChats) => {
        // Check if the message already exists to avoid duplicates
        const exists = prevChats.some((chat) => chat.token === res.token);
        if (!exists) {
          return [...prevChats, res];
        }
        return prevChats; // Return unchanged if it exists
      });

      // Update local storage
      const storedChats: ChatResponse[] = JSON.parse(
        localStorage.getItem("chats") || "[]"
      );

      // Find the current chat using the recipient token
      const currentChatIndex = storedChats.findIndex(
        (storedChat) =>
          storedChat.recipientData.token.trim() ===
          chat.recipientData.token.trim()
      );

      if (currentChatIndex !== -1) {
        // Remove duplicate messages based on the token
        storedChats[currentChatIndex].read = storedChats[
          currentChatIndex
        ].read.filter((message: { token: any }) => message.token !== res.token);

        // If chat exists, update it
        const updatedChat = {
          ...storedChats[currentChatIndex],
          read: [...storedChats[currentChatIndex].read, res], // Append new message to read
          lastMessage: res, // Update lastMessage to the latest sent message
        };
        storedChats[currentChatIndex] = updatedChat; // Update the stored chat
      } else {
        // If chat does not exist, create a new entry
        const newChat: ChatResponse = {
          recipient: chat.recipientData.token,
          recipientData: chat.recipientData,
          read: [res],
          lastMessage: res, // Set lastMessage to the sent message
        };
        storedChats.push(newChat); // Add the new chat to the array
      }

      localStorage.setItem("chats", JSON.stringify(storedChats)); // Save back to local storage

      // Clear form data
      setFormData((prevData) => ({ ...prevData, message: "", image: "" }));
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  Math.floor(Date.now() / 1000);

  // handles the selection of emoji's
  const handleEmojiSelect = (emoji: any) => {
    setFormData((prevData) => ({
      ...prevData,
      message: prevData.message + emoji.shortcodes,
    }));
  };

  // it formats the date to display in Fri 02 september
  const formatDate = (day: string, month: string, year: string) => {
    const today = new Date();
    const messageDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    // Check if the message date is today
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    }

    // Format the date as "Fri, 14 March"
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "long",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      messageDate
    );

    return formattedDate;
  };

  // Sort chats by timestamp in descending order
  const sortedChats = [...chats].sort((a, b) => a.timestamp - b.timestamp);

  // Group the sorted chats by date
  const groupedChats = sortedChats.reduce(
    (groups: Record<string, ReadResponse[]>, chat) => {
      const dateKey = formatDate(
        chat.time_day,
        chat.time_month,
        chat.time_year
      );
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(chat);
      return groups;
    },
    {}
  );

  // Function to open the modal with the clicked image
  const handleImageClick = (image: string) => {
    setModalImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null);
  };

  // create a case note
  const createCaseNote = () => {
    onCreateCaseNote();
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full relative">
        {/* header */}
        <div className="w-full bg-greens text-white flex items-center justify-between p-4 md:p-7">
          <div className="flex items-center gap-4">
            <div>
              <Link to={"/chats"} className="block lg:hidden">
                <FaArrowLeft />
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-[2.5rem] md:w-[3.5rem] aspect-square rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={chat?.recipientData?.photo || "/doctors.jpg"}
                  alt=""
                />
              </div>

              <div className="">
                <p>
                  {chat?.recipientData.firstName} {chat?.recipientData.lastName}
                </p>
                <p>online</p>
              </div>
            </div>
          </div>

          {/* click to create caseNote */}
          {usertype === "Doctor" && (
            <button>
              <MdInsertDriveFile size={30} onClick={createCaseNote} />
            </button>
          )}
        </div>

        {isInitialLoading ? (
          <div className="w-full grid items-center justify-center mt-10">
            <Loader />
          </div>
        ) : (
          <div className="h-[calc(80%-4rem)] text-black overflow-y-scroll flex flex-col p-4">
            {/* Loading spinner for ongoing fetches without clearing messages */}
            {isRefreshing && (
              <div className="w-full absolute left-0 top-[7rem] flex items-center justify-center mt-2">
                <p className=" text-gray-400/10">loading...</p>
              </div>
            )}
            {Object.entries(groupedChats).map(([date, messages]) => (
              <div key={date}>
                {/* Display the date */}
                <div className="w-full flex items-center justify-center pt-4">
                  <p className=" w-fit rounded-full py-2 px-3 bg-[#FFF3F3] text-[#D95D39]">
                    {date}
                  </p>
                </div>
                {messages.map((chat, index) => (
                  <div
                    key={index}
                    className={`mt-5 flex ${
                      usertoken === chat.sender
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`w-fit max-w-[70%] py-3 px-6 shadow-md rounded-md ${
                        usertoken === chat.sender
                          ? " bg-bgGreen text-right"
                          : "bg-white text-left"
                      }`}
                    >
                      {/* Display image if present */}
                      {chat.image && (
                        <div className="mt-2">
                          <img
                            src={chat.image}
                            alt="Attached"
                            className="w-32 h-32 object-cover rounded-md"
                            onClick={() => handleImageClick(chat.image || "")}
                          />
                        </div>
                      )}

                      {emoji.emojify(chat.message || "")}

                      <p className="w-full flex items-center justify-end text-sm text-[#7C7C7C]">
                        {FormatTime(chat.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* {isLoading ? "Sending" : ""} */}

            <div ref={endRef}></div>
          </div>
        )}

        {/* Image Modal */}
        {modalImage && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-[70%] mt-10">
              <button
                className="absolute top-0 right-0 p-2 text-white"
                onClick={closeModal}
              >
                Close
              </button>
              <img
                src={modalImage}
                alt="Large view"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* input field */}
        <form className="w-full">
          <div className=" absolute left-[50%] -translate-x-[50%] bottom-2 lg:bottom-10 w-[90%] xl:w-[35rem]">
            <div className=" bg-lemongreen py-2 px-2 sm:px-6 rounded-full flex items-center gap-2">
              <div className="bg-white w-full rounded-full p-4 flex items-center gap-4">
                <div className="relative w-[3rem] grid items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                  >
                    <img src="/emoji.png" alt="Emoji Picker" />
                  </button>
                  {emojiPickerOpen && (
                    <div className="absolute -top-[30rem] -left-[15rem]">
                      <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    name="message"
                    value={emoji.emojify(formData.message)}
                    onChange={handleChange}
                    className="py-1.5 italic bg-transparent w-full outline-none"
                    placeholder="Type message..."
                  />
                  {selectedImage && (
                    <div className="relative w-fit">
                      <div className="w-10 aspect-square rounded-md overflow-hidden mt-2">
                        <img
                          className="w-full h-full object-cover"
                          src={selectedImage}
                          alt="Camera"
                        />
                      </div>
                      <button
                        className="absolute -top-2 -right-2 bg-red-500 z-10 rounded-full w-4 h-4 flex items-center justify-center"
                        type="button"
                        onClick={handleRemoveImage}
                      >
                        <HiMiniTrash color="white" size={10} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 items-center justify-center w-[5rem]">
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        id="image-input"
                        hidden
                      />
                      <label htmlFor="image-input" className="cursor-pointer">
                        <img src="/attach.png" alt="Attach" />
                      </label>
                    </div>
                  </div>
                  <div className="relative">
                    <button onClick={sendUserChat} disabled={!bvnStatus}>
                      <IoSendSharp />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button className="bg-greens w-[2.5rem] sm:w-[4rem] aspect-square grid items-center justify-center rounded-full overflow-hidden">
                  <img className="w-[0.8rem]" src="/vn.png" alt="Voice Note" />
                </button>
              </div>
            </div>
            <span
              className={`text-red-500 text-xs text-center ${
                bvnStatus ? "hidden" : "block"
              }`}
            >
              Please Subscribe to be able to chat
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChattingPage;
