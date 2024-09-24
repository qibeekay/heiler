import axios from 'axios';
import { toast } from 'react-toastify';

const URL = import.meta.env.VITE_API_URL;
const bearer = import.meta.env.VITE_BEARER_TOKEN;

// user registration
export const DoctorSettings = async (userData: {
	pword: string;
	usertoken: string;
	phone: string;
	title: string;
	lastName: string;
	firstName: string;
	cpword: string;
	oldpword: string;
	photo: string;
}) => {
	try {
		const response = await axios.post(`${URL}/doctors/settings`, userData, {
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		});

		console.log(response.data.success);
		if (response.data.success === false) {
			toast.error(response.data.message);
			return false; // Verification failed
		} else {
			toast.success(response.data.message);
			return true; // Verification succeeded
		}
	} catch (error: any) {
		console.error('Registration Error', error);
		toast.error('Error creating an account');
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};
