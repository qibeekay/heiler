import React, { FormEvent, useEffect, useState } from "react";
import { HiMiniXMark, HiOutlinePlusSmall, HiXMark } from "react-icons/hi2";
import { MdSend } from "react-icons/md";
import { CreateCaseNotes, GetMedicalRecord } from "../../api/patients";
import { useParams } from "react-router-dom";
import FormatTime from "../../utils/formatTime";

interface data {
  usertoken: string;
  doctor: string;
  doctorData: {
    mail: string;
    token: string;
    phone: string;
    firstName: string;
    lastName: string;
    photo: string;
    specialty_name: string;
    title: string;
  };
  note: string;
  timestamp: number;
}

interface Response {
  data: data[];
}

const CaseNote = ({ onCloseCaseNote }: any) => {
  const [caseNotes, setCaseNotes] = useState<data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usertoken, setUsertoken] = useState("");
  const params = useParams();

  console.log("params", params);

  useEffect(() => {
    const userData = localStorage.getItem("dets");
    if (userData) {
      const userObject = JSON.parse(userData);
      setUsertoken(userObject.data.token);
    }
  }, []);

  const [formData, setFormData] = useState({
    doctor: "",
    usertoken: "",
    note: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const closeCaseNote = () => {
    onCloseCaseNote();
  };

  // get previous casenotes
  const getPatientRecord = async () => {
    setIsLoading(true);
    try {
      const res = await GetMedicalRecord(params?.id!, usertoken);
      setCaseNotes(res);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (usertoken && params.id) {
      getPatientRecord();
    }
  }, [usertoken, params.id]);

  const handleAddCaseNote = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      ...formData,
      doctor: usertoken,
      usertoken: params?.id,
    };
    try {
      const res = await CreateCaseNotes(payload);
      setCaseNotes((prevChats) => [...prevChats, res]);
      setFormData((prevChats) => ({ ...prevChats, note: "" }));
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full lg:w-[70%] shadow-right-only bg-white p-4 llg:p-7 relative`}
    >
      {/* search and add users */}
      <div className="w-full relative bg-white">
        {/* header */}
        <div className="flex items-center justify-center">
          <h1 className="text-black text-2xl font-bold mb-10">Case note</h1>
        </div>

        {/* case notes */}
        {caseNotes.length === 0 ? (
          <div className=" text-center mt-10 mb-20">
            <p>No record found </p>
          </div>
        ) : (
          <div>
            {caseNotes?.map((note, index) => (
              <div key={index} className="mb-4 w-full">
                <div className=" bg-[#FFF5E8] px-[24px] py-[12px] rounded-lg w-full">
                  <p>{note?.note}</p>
                  <div className="w-full items-center justify-end">
                    <p className="text-[#7C7C7C] text-sm">
                      {FormatTime(note?.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <div className="w-4 aspect-square rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={note?.doctorData?.photo || "/doctors.png"}
                      alt=""
                    />
                  </div>
                  <p className="text-greens text-sm font-bold">
                    {note?.doctorData?.firstName} {note?.doctorData?.lastName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* add new case note */}
        <form>
          <div className="border border-greens rounded-md w-full p-4 h-[264px] flex flex-col">
            <textarea
              value={formData.note}
              name="note"
              onChange={handleChange}
              className="border-none bg-transparent w-full h-full outline-none"
              placeholder="Add new case note"
            />
            <div className="flex items-center justify-end">
              <button
                onClick={handleAddCaseNote}
                className="bg-greens w-[56px] aspect-square rounded-full grid items-center justify-center text-white"
              >
                <MdSend size={25} />
              </button>
            </div>
          </div>
        </form>

        {/* create case note */}
        <div className="flex items-center justify-center w-full text-greens mt-20">
          <button onClick={closeCaseNote} className="flex items-center gap-2">
            <HiXMark size={20} />
            <p>Close Case Note</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseNote;
