import React from "react";
import FormatTime from "../../utils/formatTime";

interface Records {
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

interface Props {
  response: Records[];
}

const PatientRecordCat = ({ response }: Props) => {
  console.log(response.length);
  return (
    <div className="font-inter text-dark w-full pt-8 px-4 sm:px-8 xl:px-[5rem]">
      <div className="w-full border shadow rounded-md bg-white p-[32px]">
        <h1 className="text-center text-2xl font-bold">Medical Record</h1>
        <div className="w-full flex flex-col gap-4 mt-16 items-center justify-center">
          {response?.map((record, index) => (
            <div className="w-full max-w-[768px] mx-auto">
              <div
                key={index}
                className="bg-[#FFF5E8] rounded-md py-3 px-6 w-full "
              >
                <div>{record?.note}</div>
                <div className="w-full flex justify-end">
                  <p className="text-sm text-[#7C7C7C]">
                    {FormatTime(record?.timestamp)}
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-end gap-2 mt-4">
                <div className="w-4 aspect-square rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={record?.doctorData?.photo || "/doctors.jpg"}
                    alt=""
                  />
                </div>
                <p className="text-greens text-sm font-bold">
                  Dr. {record?.doctorData?.firstName}{" "}
                  {record?.doctorData?.lastName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientRecordCat;
