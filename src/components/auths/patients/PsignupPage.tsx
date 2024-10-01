import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CountrySelect } from "../../index";
import Datepicker from "react-tailwindcss-datepicker";
import { Checkbox } from "@material-tailwind/react";
import {
  IoMaleSharp,
  IoFemaleSharp,
  IoEyeSharp,
  IoEyeOffSharp,
} from "react-icons/io5";
import { HiChevronLeft } from "react-icons/hi2";
import { UserRegister } from "../../../api/auth";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import Loader from "../../loader/Loader";

const PsignupPage = () => {
  const [step, setStep] = useState(1);
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleTermsChange = () => {
    setTerms(true);
  };

  const handleMaleChange = () => {
    setIsMaleSelected(true);
    setIsFemaleSelected(false);
    setFormData((prevFormData) => ({ ...prevFormData, gender: "Male" }));
  };

  const handleFemaleChange = () => {
    setIsMaleSelected(false);
    setIsFemaleSelected(true);
    setFormData((prevFormData) => ({ ...prevFormData, gender: "Female" }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const togglePassword1Visibility = () => {
    setShowPassword1((prevState) => !prevState);
  };

  const [formData, setFormData] = useState({
    mail: "",
    pword: "",
    phone: "",
    lastName: "",
    firstName: "",
    home_address: "",
    gender: "",
    cpword: "",
    nationality: "",
    dob: "",
    terms: false,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCountryChange = (selectedCountry: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nationality: selectedCountry,
    }));
  };

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (newValue: any) => {
    const formattedDate = dayjs(newValue.startDate).format("DD/MM/YYYY");
    setFormData((prevFormData) => ({ ...prevFormData, dob: formattedDate }));
    setValue(newValue);
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const payload = { ...formData, terms: terms };

    try {
      const res = await UserRegister(payload);
      if (res) {
        setTimeout(() => {
          navigate("/verify-email");
        }, 1000);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full font-roboto">
      <div className="w-full relative h-full min-h-screen bg-back bg-cover bg-center bg-no-repeat">
        <div className="absolute bg-black/60 w-full h-full min-h-screen top-0 left-0"></div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <form
            className="bg-white rounded-xl w-[90%] sm:w-[30rem] md:w-[31rem] py-[1rem] px-[2rem] my-[2rem] overflow-hidden relative"
            onSubmit={handleSubmit}
          >
            {/* header text/images */}
            <div className="pt-4">
              {/* image */}
              <div className="w-[12rem] mx-auto">
                <img
                  className="w-full h-full object-cover"
                  src={step === 3 ? "/pass.png" : "/logo.png"}
                  alt=""
                />
              </div>
              {/* header text */}
              <div className="text-center">
                <h1 className="font-semibold text-xl sm:text-3xl">
                  {step === 3 ? "Set up your password" : "Create an Account"}
                </h1>
                <p className=" text-sm sm:text-base text-lightDark mt-2">
                  {step === 3
                    ? "Set up your password to complete registration."
                    : "Register to have access to the Dashboard."}
                </p>
              </div>
            </div>

            {/* inputs */}
            <div className="flex flex-col gap-7 my-[2.5rem] relative">
              {/* first tab */}
              {/* first name, last name, email, date of birth */}
              <div
                className={`transition-transform duration-500 ease-in-out absolute inset-0 ${
                  step === 1 ? "translate-x-0" : "-translate-x-full"
                } ${step > 1 ? "opacity-0 absolute" : "opacity-100 relative"}`}
              >
                {/* first name */}
                <div className="mb-7">
                  <input
                    className="p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </div>

                {/* last name */}
                <div className="mb-7">
                  <input
                    className="p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </div>

                {/* email address */}
                <div className="mb-7">
                  <input
                    className="p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]"
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>

                {/* date picker */}
                <div className="w-full">
                  <Datepicker
                    useRange={false}
                    asSingle={true}
                    value={value}
                    popoverDirection="up"
                    displayFormat="DD/MM/YYYY"
                    onChange={handleDateChange}
                    showShortcuts={false}
                    placeholder="Date of Birth"
                    // classNames={'w-full'}
                    inputClassName="w-full  rounded-md focus:ring-0 border border-[#C2C8D0]/60 font-normal border p-4 bg-bgGreen placeholder:text-[#858585]"
                  />
                </div>
              </div>

              {/* second tab */}
              {/* occupation and nationality */}
              <div
                className={`transition-transform duration-500 ease-in-out inset-0 ${
                  step === 2 ? "translate-x-0" : "translate-x-full"
                } ${
                  step === 2 ? "opacity-100 relative" : "opacity-0 absolute"
                }`}
              >
                {/* country / phone details */}
                <div className="w-full mb-4">
                  <CountrySelect
                    selectedCountry={formData.nationality}
                    phone={formData.phone}
                    onCountryChange={handleCountryChange}
                    onPhoneChange={handlePhoneChange}
                  />
                </div>

                {/* gender select */}
                <div className="mb-4 flex gap-2">
                  {/* male select  */}
                  <label className="flex items-center gap-2 font-semibold text-xl text-dark cursor-pointer">
                    <Checkbox
                      checked={isMaleSelected}
                      onChange={handleMaleChange}
                      label={
                        <p className="flex items-center gap-2 font-semibold text-xl text-dark">
                          Male <IoMaleSharp />
                        </p>
                      }
                      crossOrigin=""
                    />
                  </label>

                  {/* female select */}
                  <label className="flex items-center gap-2 font-semibold text-xl text-dark cursor-pointer">
                    <Checkbox
                      checked={isFemaleSelected}
                      onChange={handleFemaleChange}
                      label={
                        <p className="flex items-center gap-2 font-semibold text-xl text-dark">
                          Female <IoFemaleSharp />
                        </p>
                      }
                      crossOrigin=""
                    />
                  </label>
                </div>

                {/* occupation */}
                {/* <div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='text'
										name='firstNa'
										value={formData.}
										onChange={handleChange}
										placeholder='Occupation'
									/>
								</div> */}

                {/* home address */}
                <div className="mb-7">
                  <input
                    className="p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]"
                    type="text"
                    name="home_address"
                    value={formData.home_address}
                    onChange={handleChange}
                    placeholder="Home Address"
                  />
                </div>
              </div>

              {/* third tab */}
              {/* password and confirm password */}
              <div
                className={`transition-transform duration-500 ease-in-out absolute inset-0 ${
                  step === 3
                    ? "translate-x-0"
                    : step < 3
                    ? "translate-x-full"
                    : "-translate-x-full"
                } ${
                  step === 3 ? "opacity-100 relative" : "opacity-0 absolute"
                }`}
              >
                {/* password */}
                <div className="mb-7 relative">
                  <input
                    className="p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]"
                    type={showPassword ? "text" : "password"}
                    name="pword"
                    value={formData.pword}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black/60"
                  >
                    {showPassword ? (
                      <IoEyeOffSharp size={25} />
                    ) : (
                      <IoEyeSharp size={25} />
                    )}
                  </button>
                </div>

                {/* confirm password */}
                <div className="mb-7 relative">
                  <input
                    className="p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]"
                    type={showPassword1 ? "text" : "password"}
                    name="cpword"
                    value={formData.cpword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={togglePassword1Visibility}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black/60"
                  >
                    {showPassword1 ? (
                      <IoEyeOffSharp size={25} />
                    ) : (
                      <IoEyeSharp size={25} />
                    )}
                  </button>
                </div>

                {/* terms and condition */}
                <Checkbox
                  checked={terms}
                  onChange={handleTermsChange}
                  crossOrigin=""
                  label={
                    <p className=" font-inter font-normal text-sm text-dark">
                      I hereby accept the
                      <Link
                        to={""}
                        className="font-bold transition-colors hover:text-greens"
                      >
                        &nbsp;terms and conditions{""}
                      </Link>
                      {""} of healing race
                    </p>
                  }
                />
              </div>
            </div>

            {/* buttons */}
            <div className="flex flex-col gap-4">
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="w-full border border-greens bg-greens text-white font-bold text-lg font-inter rounded py-4 shadow-sm"
                >
                  Next
                </button>
              ) : (
                <button className="w-full border border-greens bg-greens text-white font-bold text-lg font-inter rounded py-4 shadow-sm">
                  {isLoading ? <Loader /> : "Create Account"}
                </button>
              )}
              {step > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute top-4 font-semibold flex items-center gap-2"
                >
                  <HiChevronLeft />
                  Previous
                </button>
              )}
            </div>
            {/* already have an account */}
            <div className="mt-5 text-center">
              <p className="text-[#818181]">
                Already have an account?{" "}
                <Link className="text-greens font-bold" to="/patients/login">
                  Log in
                </Link>
              </p>
            </div>
          </form>

          {/* footer link */}
          <div className="relative z-10">
            <p className="w-full flex flex-col xs:flex-row gap-2 md:gap-20 items-center text-[#FDFFFE]/70 text-sm sm:text-base">
              &copy; 2024 Heiler.{" "}
              <span className="flex items-center gap-2">
                <img src="/fireswitch.png" alt="" />
                Developed By FireSwitch Technologies
              </span>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PsignupPage;
