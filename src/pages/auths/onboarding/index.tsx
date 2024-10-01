import { Button } from "react-day-picker";
import { Link, useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const handlePatient = () => {
    navigate("/patients/signup");
  };

  const handleDoctors = () => {
    navigate("/doctors/signup");
  };
  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div className="w-full">
        <h1 className="text-center font-roboto font-semibold text-3xl">
          Who are you?
        </h1>
        <div className="w-full flex flex-col gap-8 mt-8">
          {/* patient doctor */}
          <div className="w-full max-w-[440px] mx-auto">
            <button
              className="border w-full border-greens rounded-md text-greens text-xl font-bold py-[13px]"
              onClick={handlePatient}
            >
              Patient
            </button>
          </div>

          {/* doctors link */}
          <div className="w-full max-w-[440px] mx-auto">
            <button
              className="border w-full border-greens rounded-md bg-greens text-white text-xl font-bold py-[13px]"
              onClick={handleDoctors}
            >
              Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
