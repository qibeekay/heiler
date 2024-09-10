import axios from 'axios';
import { toast } from 'react-toastify';

const URL = import.meta.env.VITE_API_URL;
const bearer = import.meta.env.VITE_BEARER_TOKEN;

// get chat
export const GetUserChat = async (usertoken: string) => {
	try {
		const response = await axios.post(
			`${URL}/chat/get`,
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
			toast.success('Verification successful!');
			// return true; // Verification succeeded
			return response.data.data;
		}
	} catch (error: any) {
		console.error('Login Error', error);
		toast.error('Error login user in');
		throw new Error(error.response?.data?.message || 'Failed to login');
	}
};

// send chat
export const SendUserChat = async (payload: {
	sender: string;
	recipient: string;
	message: string;
	image: string; // image to be sent (base64)
	vn: string; // in case of voice note (base64)
}) => {
	try {
		const response = await axios.post(`${URL}/chat/send`, payload, {
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		});

		console.log(response.data.success);
		if (response.data.success === false) {
			toast.error(response.data.message);
			// return false; // Verification failed
			return [];
		} else {
			toast.success('Verification successful!');
			// return true; // Verification succeeded
			return response.data.data;
		}
	} catch (error: any) {
		console.error('Login Error', error);
		toast.error('Error login user in');
		throw new Error(error.response?.data?.message || 'Failed to login');
	}
};

// get chat
export const ReadUserChat = async (usertoken: string, recipient: string) => {
	try {
		const response = await axios.post(
			`${URL}/chat/read`,
			{ usertoken, recipient },
			{
				headers: {
					Authorization: `Bearer ${bearer}`,
				},
			}
		);

		if (response.data.data && response.data.data.length > 0) {
			toast.success('Chats retrieved successfully!');
			return response.data.data;
		} else if (response.data.success === false) {
			toast.error(response.data.message);
			return [];
		} else {
			toast.info('No chats available.');
			return [];
		}
	} catch (error: any) {
		console.error('Login Error', error);
		toast.error('Error login user in');
		throw new Error(error.response?.data?.message || 'Failed to login');
	}
};
