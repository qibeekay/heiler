import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;
const bearer = import.meta.env.VITE_BEARER_TOKEN;

// get chat notifications
export const GetChatNotification = async (usertoken: string) => {
  try {
    const response = await axios.post(
      `${URL}/general/notifications.chat`,
      { usertoken },
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

export const GetNotifications = async (usertoken: string) => {
  try {
    const response = await axios.post(
      `${URL}/general/notifications.get`,
      { usertoken },
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

export const ReadNotifications = async (usertoken: string, noteID: number) => {
  try {
    const response = await axios.post(
      `${URL}/general/notifications.read`,
      { usertoken, noteID },
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
