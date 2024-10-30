import { useNavigate, useParams } from "react-router-dom";
import { FdDoctorBySpecialtyCat, Header } from "../../../components";
import { useEffect, useState } from "react";
import { GetDoctorBySpecialty } from "../../../api/doctors";
import Loader from "../../loader/Loader";
import { RiSearch2Line } from "react-icons/ri";
import { HiChevronLeft } from "react-icons/hi2";

interface Doctor {
  token: string;
  firstName: string;
  lastName: string;
  mail: string;
  timestamp: string;
}

const FdDoctorBySpecialtyMain = () => {
  const [usertoken, setUsertoken] = useState("");
  const [response, setResponse] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchId = useParams();

  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  // Convert `id` to a number if it is defined; otherwise, it remains `undefined`
  const id = searchId.specialty ? parseInt(searchId.specialty, 10) : 0;

  useEffect(() => {
    // Fetch mail from localStorage when the component mounts
    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  // console.log(usertoken, id);
  const getDoctorSpecialty = async () => {
    setIsLoading(true);
    try {
      const res = await GetDoctorBySpecialty(id!, usertoken);
      setResponse(res);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (usertoken) {
      getDoctorSpecialty();
    }
  }, [usertoken]);

  return (
    <div className="w-full lg:w-[82%] xll:w-[85%] bg-white">
      <Header title="Find your doctors" />
      <div className="px-4 sm:px-8 xl:px-[5rem] mt-[8rem]">
        <div className="flex items-center justify-between">
          {/* back */}
          <button className="flex items-center gap-2" onClick={handleback}>
            <HiChevronLeft />
            <p>Back</p>
          </button>

          {/* search */}
          <div>
            <div className=" shadow-lg bg-white flex gap-2 p-4 w-full md:w-[30rem] rounded-md">
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

      {/* other details */}
      {isLoading ? (
        <div className="w-full grid items-center justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <FdDoctorBySpecialtyCat response={response} />
      )}
    </div>
  );
};

export default FdDoctorBySpecialtyMain;
