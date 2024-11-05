import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;
const bearer = import.meta.env.VITE_BEARER_TOKEN;

export const GetMedicalRecord = async (
  usertoken: string,
  doctor_token: string
) => {
  try {
    const response = await axios.post(
      `${URL}/doctors/caseNotes/get`,
      { usertoken, doctor_token },
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }
    );

    console.log(response.data.success);
    if (response.data.success === false) {
      // toast.error(response.data.message);
      // return false; // Verification failed
      return [];
    } else {
      toast.success("Records fetch successful!");
      // return true; // Verification succeeded
      return response.data.data;
    }
  } catch (error: any) {
    console.error("error Error", error);
    toast.error("Error fetching records");
    throw new Error(error.response?.data?.message || "Failed");
  }
};

// create case notes
export const CreateCaseNotes = async (payload: {
  doctor: string;
  usertoken: string | undefined;
  note: string;
}) => {
  try {
    const response = await axios.post(
      `${URL}/doctors/caseNotes/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }
    );

    console.log(response.data.success);
    if (response.data.success === false) {
      //   toast.error(response.data.message);
      // return false; // Verification failed
      return [];
    } else {
      // toast.success('Verification successful!');
      // return true; // Verification succeeded
      return response.data.data;
    }
  } catch (error: any) {
    console.error("Error", error);
    toast.error("Error creating case notes");
    throw new Error(error.response?.data?.message || "Failed to create");
  }
};
