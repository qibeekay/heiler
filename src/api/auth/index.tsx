import axios from 'axios';
import { toast } from 'react-toastify';

const URL = import.meta.env.VITE_API_URL;
const bearer = import.meta.env.VITE_BEARER_TOKEN;

// user registration
export const UserRegister = async (userData: {
	mail: string;
	pword: string;
	phone: string;
	lastName: string;
	firstName: string;
	home_address: string;
	gender: string;
	cpword: string;
	nationality: string;
	dob: string | null;
	terms: boolean;
}) => {
	try {
		const response = await axios.post(`${URL}/auth/user.register`, userData, {
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
			localStorage.setItem('emailed', userData.mail);
			return true; // Verification succeeded
		}
	} catch (error: any) {
		console.error('Registration Error', error);
		toast.error('Error creating an account');
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};

// user login
export const UserLogin = async (userData: { mail: string; pword: string }) => {
	try {
		const response = await axios.post(`${URL}/auth/user.login`, userData, {
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		});

		console.log(response.data);
		if (response.data.success === false) {
			toast.error(response.data.message);
			return false; // Verification failed
		} else {
			toast.success('Verification successful!');
			localStorage.setItem('dets', JSON.stringify(response.data.data));
			return true; // Verification succeeded
		}
	} catch (error: any) {
		console.error('Login Error', error);
		toast.error('Error login user in');
		throw new Error(error.response?.data?.message || 'Failed to login');
	}
};

// doctorregistration
export const DoctorRegister = async (userData: {
	mail: string;
	pword: string;
	phone: string;
	lastName: string;
	firstName: string;
	home_address: string;
	gender: string;
	cpword: string;
	nationality: string;
	place_of_practice: string;
	induction_year: string;
	specialty: number;
	terms: boolean;
}) => {
	try {
		const response = await axios.post(`${URL}/auth/doctor.register`, userData, {
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
			localStorage.setItem('emailed', userData.mail);
			return true; // Verification succeeded
		}
	} catch (error: any) {
		console.error('Registration Error', error);
		toast.error('Error creating an account');
		throw new Error(error.response?.data?.message || 'Failed to register');
	}
};

// doctor login
export const DoctorLogin = async (userData: {
	mail: string;
	pword: string;
}) => {
	try {
		const response = await axios.post(`${URL}/auth/doctor.login`, userData, {
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		});

		console.log(response.data);
		if (response.data.success === false) {
			toast.error(response.data.message);
			return false; // Verification failed
		} else {
			toast.success('Verification successful!');
			return true; // Verification succeeded
		}
	} catch (error: any) {
		console.error('Login Error', error);
		toast.error('Error login user in');
		throw new Error(error.response?.data?.message || 'Failed to login');
	}
};

// verify email
export const VerifyMail = async (userData: {
	mail: string;
	code: string;
}): Promise<boolean> => {
	try {
		const response = await axios.post(`${URL}/auth/verify.email`, userData, {
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		});

		if (response.data.success === false) {
			toast.error(response.data.message);
			return false; // Verification failed
		} else {
			toast.success(response.data.message);
			return true; // Verification succeeded
		}
	} catch (error: any) {
		console.error('Verifying Error', error);
		toast.error('Error verifying the account');
		throw new Error(error.response?.data?.message || 'Failed to verify');
	}
};
