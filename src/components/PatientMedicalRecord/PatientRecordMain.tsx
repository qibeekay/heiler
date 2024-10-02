import React, { useEffect, useState } from "react";
import Header from "../externalComponents/Header";
import { RiSearch2Line } from "react-icons/ri";
import { HiChevronLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import PatientRecordCat from "./PatientRecordCat";
import { GetMedicalRecord } from "../../api/patients";

const PatientRecordMain = () => {
  const [response, setResponse] = useState([]);
  const [usertoken, setUsertoken] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchId = useParams();

  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  // Convert `id` to a number if it is defined; otherwise, it remains `undefined`
  const id = searchId.id;

  console.log(id);

  useEffect(() => {
    // Fetch mail from localStorage when the component mounts
    const userToken = localStorage.getItem("user")?.trim();
    if (userToken) {
      const cleanedUserToken = userToken.replace(/"/g, "");
      setUsertoken(cleanedUserToken);
    }
  }, []);

  const getPatientRecord = async () => {
    setIsLoading(true);
    try {
      const res = await GetMedicalRecord(id!, usertoken);
      setResponse(res);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (usertoken && id) {
      getPatientRecord();
    }
  }, [usertoken, id]);

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
            <div className=" shadow-lg bg-white flex gap-2 p-4 w-full sm:w-[30rem] rounded-md">
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
      ) : response.length === 0 ? (
        <div className="text-center mt-10">No record found</div>
      ) : (
        <PatientRecordCat response={response} />
      )}
    </div>
  );
};

export default PatientRecordMain;
