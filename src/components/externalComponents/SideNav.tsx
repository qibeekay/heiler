import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useConverstion } from "../useConversation";
import { GetChatNotification } from "../../api/notification";

const SideNav = () => {
  const location = useLocation();
  const params = useParams();
  const [usertype, setUsertype] = useState<string | "">("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [usertoken, setUsertoken] = useState("");
  const [unRead, setUnread] = useState(0);

  useEffect(() => {
    // Fetch mail from localStorage when the component mounts
    const userType = localStorage.getItem("type")?.trim();
    if (userType) {
      const cleanedUserType = userType.replace(/"/g, "");
      setUsertype(cleanedUserType);
    }

    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  const { isActive } = useConverstion();

  const getNotifications = async () => {
    try {
      const res = await GetChatNotification(usertoken);
      setUnread(res);
    } catch (error) {
      console.error("Error fetching new chats notifications:", error);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (usertoken) {
      // Fetch notifications immediately
      getNotifications();

      // Set up polling every 5 seconds
      intervalId = setInterval(() => {
        getNotifications();
      }, 5000);
    }

    return () => {
      // Clear interval on component unmount or when usertoken changes
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [usertoken]);

  // navigation links
  const links = [
    {
      to: "/",
      label: "Home",
      iconDefault: "/homeL.png",
      iconHover: "/homeD.png",
      miconDefault: "/mhomeL.png",
      miconHover: "/mhomeD.png",
    },
    {
      to: usertype === "User" ? "/find-doctor" : "/find-patient",
      label: usertype === "User" ? "Doctor" : "Patient",
      iconDefault: usertype === "User" ? "/doctorL.png" : "/patientL.png",
      iconHover: usertype === "User" ? "/doctorD.png" : "/patientD.png",
      miconDefault: usertype === "User" ? "/mdoctorL.png" : "/patientL.png",
      miconHover: usertype === "User" ? "/mdoctorD.png" : "/patientD.png",
    },
    {
      to: "/chats",
      label: "Chat",
      iconDefault: "/chatL.png",
      iconHover: "/chatD.png",
      miconDefault: "/mchatL.png",
      miconHover: "/mchatD.png",
    },
    {
      to: "/wallet",
      label: "Wallet",
      iconDefault: "/walletL.png",
      iconHover: "/walletD.png",
      miconDefault: "/mwallerL.png",
      miconHover: "/walletD.png",
    },
    // {
    // 	to: '/notifcations',
    // 	label: 'Notifications',
    // 	iconDefault: '/notifyL.png',
    // 	iconHover: '/notifyD.png',
    // },
    // {
    //   to: "/cards",
    //   label: "Cards",
    //   iconDefault: "/cardL.png",
    //   iconHover: "/cardD.png",
    // },
    {
      to: "/more",
      label: "More",
      iconDefault: "/moreL.png",
      iconHover: "/moreD.png",
      miconDefault: "/mmoreL.png",
      miconHover: "/mmoreD.png",
    },
  ];

  return (
    <div
      className={`${
        isActive ? "hidden lg:block" : "block"
      } font-inter py-5 px-4 xl:px-10 bg-white fixed z-50 bottom-0 lg:top-0 lg:h-screen w-full lg:w-[18%] xll:w-[15%] shadow-top-only lg:shadow-right-only`}
    >
      <div>
        <div className="hidden lg:block">
          <div className="w-[10rem]">
            <img
              className="w-full h-full object-cover"
              src="/logo.png"
              alt=""
            />
          </div>
          <div className="px-4 mt-14">
            <ul className="flex flex-col gap-10 text-sm llg:text-base">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex gap-4 items-center font-bold transition duration-300 ease-in ${
                      location.pathname === link.to ||
                      (link.to === "/chats" &&
                        location.pathname.startsWith("/chats")) ||
                      (link.to === "/find-patient" &&
                        location.pathname.startsWith("/find-patient")) ||
                      (link.to === "/find-doctor" &&
                        location.pathname.startsWith("/find-doctor")) ||
                      hoveredLink === link.to
                        ? "text-greens"
                        : "text-textgray"
                    }`}
                    onMouseEnter={() => setHoveredLink(link.to)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <div className="relative">
                      <img
                        src={
                          location.pathname === link.to ||
                          (link.to === "/chats" &&
                            location.pathname.startsWith("/chats")) ||
                          (link.to === "/find-patient" &&
                            location.pathname.startsWith("/find-patient")) ||
                          (link.to === "/find-doctor" &&
                            location.pathname.startsWith("/find-doctor")) ||
                          hoveredLink === link.to
                            ? link.iconHover
                            : link.iconDefault
                        }
                        alt=""
                      />
                      {/* Conditionally render the badge for unread messages */}
                      {link.to === "/chats" && unRead > 0 && (
                        <span className="absolute -top-2 -right-2 bg-greens text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {unRead}
                        </span>
                      )}
                    </div>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* mobile nav */}
        <div className={` lg:hidden`}>
          <div className="">
            <ul className="w-full flex gap-10 items-center justify-between text-base">
              {links
                .filter((link) => link.miconDefault)
                .map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex flex-col items-center font-bold transition duration-300 ease-in ${
                        location.pathname === link.to ||
                        (link.to === "/chats" &&
                          location.pathname.startsWith("/chats")) ||
                        (link.to === "/find-patient" &&
                          location.pathname.startsWith("/find-patient")) ||
                        (link.to === "/find-doctor" &&
                          location.pathname.startsWith("/find-doctor")) ||
                        hoveredLink === link.to
                          ? "text-greens"
                          : "text-textgray"
                      }`}
                      onMouseEnter={() => setHoveredLink(link.to)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <div className="relative">
                        <img
                          src={
                            location.pathname === link.to ||
                            (link.to === "/chats" &&
                              location.pathname.startsWith("/chats")) ||
                            (link.to === "/find-patient" &&
                              location.pathname.startsWith("/find-patient")) ||
                            (link.to === "/find-doctor" &&
                              location.pathname.startsWith("/find-doctor")) ||
                            hoveredLink === link.to
                              ? link.miconHover
                              : link.miconDefault
                          }
                          alt=""
                        />
                        {/* Conditionally render the badge for unread messages */}
                        {link.to === "/chats" && unRead > 0 && (
                          <span className="absolute -top-2 -right-2 bg-greens text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {unRead}
                          </span>
                        )}
                      </div>
                      <div className="hidden xs:block">
                        <span
                          className={`transition-opacity duration-300 ease-in-out ${
                            location.pathname === link.to ? "block" : "hidden"
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
