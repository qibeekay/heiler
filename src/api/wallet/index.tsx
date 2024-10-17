import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;
const bearer = import.meta.env.VITE_BEARER_TOKEN;

export const GetAccountData = async (usertoken: string) => {
  try {
    const response = await axios.post(
      `${URL}/wallet/account.data`,
      { usertoken },
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }
    );

    console.log(response.data.data);
    if (response.data.success === false) {
      toast.error(response.data.message);
      // return false; // Verification failed
      return [];
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    console.error("Error", error);
    toast.error("Error getting account data ");
    throw new Error(error.response?.data?.message || "Failed to get");
  }
};

// get user account balance
export const GetBalance = async (usertoken: string) => {
  try {
    const response = await axios.post(
      `${URL}/wallet/balance`,
      { usertoken },
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }
    );

    console.log(response.data.data);
    if (response.data.success === false) {
      toast.error(response.data.message);
      // return false; // Verification failed
      return [];
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    console.error("Error", error);
    toast.error("Error getting account balance ");
    throw new Error(error.response?.data?.message || "Failed to get");
  }
};

// get all packages
export const GetPackages = async () => {
  try {
    const response = await axios.post(
      `${URL}/general/packages.list`,
      {},
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }
    );

    console.log(response.data.data);
    if (response.data.success === false) {
      toast.error(response.data.message);
      // return false; // Verification failed
      return [];
    } else {
      return response.data.data;
    }
  } catch (error: any) {
    console.error("Error", error);
    toast.error("Error getting packages ");
    throw new Error(error.response?.data?.message || "Failed to get");
  }
};

// subscribe to packages
export const Subscribe = async (payload: {
  usertoken: string;
  token: string;
}) => {
  try {
    const response = await axios.post(`${URL}/wallet/subscribe`, payload, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });

    // console.log(response.data.success);
    if (response.data.success === false) {
      toast.error(response.data.message);
      return false; // Verification failed
    } else {
      return true; // Verification succeeded
    }
  } catch (error: any) {
    console.error("Subscription Error", error);
    toast.error("Error subscribing");
    throw new Error(error.response?.data?.message || "Failed to subscribe");
  }
};
