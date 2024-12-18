import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;
const bearer = import.meta.env.VITE_BEARER_TOKEN;

// get doctor specialty
export const GetSpecialty = async (usertoken: string) => {
  try {
    const response = await axios.post(
      `${URL}/general/getSpecialties`,
      usertoken,
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }
    );

    // console.log(response.data.data);
    if (response.data.success === false) {
      toast.error(response.data.message);
      return [];
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    console.error("Login Error", error);
    toast.error("Error login user in");
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

// search for a doctor
export const SearchDoctor = async (payload: {
  usertoken: string;
  keyword: string;
}) => {
  try {
    const response = await axios.post(`${URL}/doctors/search`, payload, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });

    console.log(response.data.success);
    if (response.data.success === false) {
      toast.error(response.data.message);
      return false; // Verification failed
    } else {
      // toast.success('Verification successful!');
      return true; // Verification succeeded
    }
  } catch (error: any) {
    console.error("Login Error", error);
    toast.error("Error login user in");
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

// get doctor by specialty
export const GetDoctorBySpecialty = async (id: number, usertoken: string) => {
  try {
    const response = await axios.post(
      `${URL}/doctors/list.bySpecialty`,
      { id, usertoken },
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }
    );

    console.log(response.data.success);
    if (response.data.success === false) {
      toast.error(response.data.message);
      // return false; // Verification failed
      return [];
    } else {
      // toast.success('Verification successful!');
      // return true; // Verification succeeded
      return response.data.data;
    }
  } catch (error: any) {
    console.error("Login Error", error);
    toast.error("Error login user in");
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};
