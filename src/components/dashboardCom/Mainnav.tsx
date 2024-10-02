import { useEffect, useState } from "react";
import { DashDetails, Header } from "../../components";
const Mainnav = () => {
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    // Fetch mail from localStorage when the component mounts
    const userData = localStorage.getItem("dets");
    if (userData) {
      const userObject = JSON.parse(userData);

      setFirstname(userObject?.firstName);
    }
  }, []);

  const getCurrentFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "short",
    };
    return new Date().toLocaleDateString("en-GB", options);
  };
  return (
    <div className="w-full lg:w-[82%] xll:w-[85%] bg-white">
      {/* header */}
      <Header date={getCurrentFormattedDate()} title={"Welcome"} />

      {/* other details */}
      <DashDetails />
    </div>
  );
};

export default Mainnav;
