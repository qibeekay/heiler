import { useNavigate } from "react-router-dom";

interface Doctor {
  token: string;
  firstName: string;
  lastName: string;
  mail: string;
  timestamp: string;
}

interface Props {
  response: Doctor[];
}

const FdDoctorBySpecialtyCat = ({ response }: Props) => {
  const navigate = useNavigate();

  const startChat = (doctor: Doctor) => {
    navigate(`/chats/${doctor.token}`, { state: { doctor, isNewChat: true } });
  };

  return (
    <div className="font-inter text-dark w-full pt-8 px-4 sm:px-8 xl:px-[5rem]">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {response?.map((doctor, index) => (
          <div
            key={index}
            className="border shadow rounded-md py-6 px-8 bg-white w-full"
          >
            <div className="flex items-center gap-2">
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
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <h1 className="text-sm md:text-[21px] font-bold text-[#0D1B34]">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h1>
                  <p className="text-greens font-semibold text-base">
                    Specialist
                  </p>
                </div>
                <p className=" text-sm md:text-base text-[#A3B1AA] ">
                  MBBS, MD, FMCS(Dentistry)
                </p>
              </div>
            </div>
            <button
              className="bg-greens mt-6 text-white w-full py-4 rounded-md"
              onClick={() => {
                startChat(doctor);
              }}
            >
              Start Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FdDoctorBySpecialtyCat;
