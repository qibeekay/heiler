import { FormEvent, useState } from "react";
import { VerifyBvn } from "../../api/kyc";
import Loader from "../loader/Loader";
import { ToastContainer } from "react-toastify";

const BvnTab = ({ usertoken }: { usertoken: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    usertoken: "",
    bvn: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const verifyBvn = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = { ...formData, usertoken: usertoken };
    try {
      const res = await VerifyBvn(payload);
      // setChats(res);
      console.log(res);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative">
      <form className="" onSubmit={verifyBvn}>
        <p className=" text-center w-[358px] mx-auto">
          To remove all limits on your account, we need to verify your BVN
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          <input
            type="text"
            name="bvn"
            value={formData.bvn}
            onChange={handleChange}
            placeholder="BVN"
            className="bg-bgGreen rounded h-[70px] px-4 outline-none text-[#858585] text-sm w-full max-w-[430px] mx-auto"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-greens rounded h-[70px] px-4 outline-none text-white text-sm font-bold w-full max-w-[430px] mx-auto"
          >
            {isLoading ? <Loader /> : "Verify"}
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default BvnTab;
