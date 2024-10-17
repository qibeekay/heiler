import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;
const bearer = import.meta.env.VITE_BEARER_TOKEN;

export const VerifyBvn = async (payload: {
  usertoken: string;
  bvn: string;
}) => {
  try {
    const response = await axios.post(`${URL}/kyc/bvn.update`, payload, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });

    // console.log(response.data.success);
    if (response.data.success === false) {
      toast.error(response.data.message);
      return false; // Verification failed
    } else {
      toast.success("Verification Ongoing!");
      return true; // Verification succeeded
    }
  } catch (error: any) {
    console.error("Verification Error", error);
    toast.error("Error verifying user in");
    throw new Error(error.response?.data?.message || "Failed to verify");
  }
};
