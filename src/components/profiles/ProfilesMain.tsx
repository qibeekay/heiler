import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import Loader from '../loader/Loader';
import { FormEvent, useEffect, useState } from 'react';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { DoctorSettings } from '../../api/settings';
import { GetUserData } from '../../api/auth';

interface Users {
	firstName: '';
	lastName: '';
	mail: '';
	phone: '';
	photo: '';
	specialty_name: '';
	title: '';
	token: '';
}

interface userResponse {
	data: Users;
}

const ProfilesMain = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [user, setUser] = useState<userResponse | null>(null);
	const [selectedImage, setSelectedImage] = useState<string | ''>('');

	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const [usertoken, setUsertoken] = useState('');

	useEffect(() => {
		const userData = localStorage.getItem('dets');
		if (userData) {
			const userObject = JSON.parse(userData);
			setUsertoken(userObject.data.token);
		}
	}, []);

	const getUserData = async () => {
		setIsLoading(true);
		try {
			const res = await GetUserData(usertoken);
			setUser(res);
		} catch {
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (usertoken) {
			getUserData();
		}
	}, [usertoken]);

	const [formData, setFormData] = useState({
		pword: '',
		usertoken: '',
		phone: '',
		title: '',
		lastName: '',
		firstName: '',
		cpword: '',
		oldpword: '',
		photo: '',
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: name === 'specialty' ? Number(value) : value, // Convert to number if specialty
		}));
	};

	const handlePhoneChange = (phone: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			phone,
		}));
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = reader.result as string;
				setFormData((prevData) => ({ ...prevData, photo: base64String }));
				setSelectedImage(base64String);
			};

			reader.readAsDataURL(file); // Convert image to Base64
		}
	};

	const UpdateFirstName = async (e: FormEvent) => {
		e.preventDefault();

		const payload = {
			usertoken: usertoken,
			firstName: formData.firstName,
			phone: '',
			title: '',
			lastName: '',
			cpword: '',
			oldpword: '',
			photo: '',
			pword: '',
		};

		try {
			const res = await DoctorSettings(payload);
			// handle success response
		} catch (error) {
			// handle error
		}
	};
	const UpdateTitle = async (e: FormEvent) => {
		e.preventDefault();
		const payload = {
			usertoken: usertoken,
			firstName: '',
			phone: '',
			title: formData.title,
			lastName: '',
			cpword: '',
			oldpword: '',
			photo: '',
			pword: '',
		};

		try {
			const res = await DoctorSettings(payload);
			// handle success response
		} catch (error) {
			// handle error
		}
	};
	const UpdateLastName = async (e: FormEvent) => {
		e.preventDefault();

		const payload = {
			usertoken: usertoken,
			firstName: '',
			phone: '',
			title: '',
			lastName: formData.lastName,
			cpword: '',
			oldpword: '',
			photo: '',
			pword: '',
		};

		try {
			const res = await DoctorSettings(payload);
			// handle success response
		} catch (error) {
			// handle error
		}
	};
	const UpdatePhoto = async (e: FormEvent) => {
		e.preventDefault();

		const payload = {
			usertoken: usertoken,
			firstName: '',
			phone: '',
			title: '',
			lastName: '',
			cpword: '',
			oldpword: '',
			photo: formData.photo,
			pword: '',
		};

		try {
			const res = await DoctorSettings(payload);
			// handle success response
		} catch (error) {
			// handle error
		}
	};
	const UpdatePhone = async (e: FormEvent) => {
		e.preventDefault();

		const payload = {
			usertoken: usertoken,
			firstName: '',
			phone: formData.phone,
			title: '',
			lastName: '',
			cpword: '',
			oldpword: '',
			photo: '',
			pword: '',
		};

		try {
			const res = await DoctorSettings(payload);
			// handle success response
		} catch (error) {
			// handle error
		}
	};
	const Updatepassword = async (e: FormEvent) => {
		e.preventDefault();

		const payload = {
			usertoken: usertoken,
			firstName: '',
			phone: '',
			title: '',
			lastName: '',
			cpword: formData.cpword,
			oldpword: formData.oldpword,
			photo: '',
			pword: formData.pword,
		};

		try {
			const res = await DoctorSettings(payload);
			// handle success response
		} catch (error) {
			// handle error
		}
	};

	console.log(user);

	return (
		<div className='w-full lg:w-[82%] xll:w-[85%] bg-white'>
			<Header title='Profile' />

			{/* other details */}
			<div className='font-inter text-dark w-full pt-8 pb-[8rem] lg:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]'>
				<div className='w-full display flex items-center justify-center mt-[7rem]'>
					{/* form */}
					<form className='bg-white rounded-xl w-[90%] sm:w-[30rem] md:w-[31rem] py-[1rem] px-[2rem] my-[2rem] overflow-hidden relative'>
						{/* header text/images */}
						<div className='w-full grid items-center justify-center'>
							<div className='relative w-fit'>
								{/* image */}
								<div className='w-[10rem] aspect-square overflow-hidden rounded-full mx-auto '>
									<img
										className='w-full h-full object-cover'
										src={selectedImage || '/img1.png'}
										alt=''
									/>
								</div>

								<div className=' bg-greens rounded-full w-[3rem] grid overflow-hidden aspect-square items-center justify-center absolute z-10 right-0 bottom-0 cursor-pointer'>
									<input
										type='file'
										name='image'
										onChange={handleImageChange}
										id='image-input'
										hidden
									/>
									<label htmlFor='image-input' className='cursor-pointer'>
										<img className='w-[1rem]' src='/camera1.png' alt='' />
									</label>
								</div>
							</div>
						</div>

						{/* inputs */}
						<div className='flex flex-col gap-7 my-[3.5rem]'>
							{/* title */}
							<div className='flex items-center gap-4'>
								<input
									className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
									type='text'
									name='title'
									value={user?.data?.title || formData.title}
									onChange={handleChange}
									placeholder='eg. MBBS, MD, FMCS'
								/>

								{/* update title */}
								<button
									className='bg-greens w-10 aspect-square rounded-md grid items-center justify-center'
									onClick={UpdateTitle}>
									<FaCheck className='text-white' />
								</button>
							</div>

							{/* first name */}
							<div className='flex items-center gap-4'>
								<input
									className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
									type='text'
									name='firstName'
									value={user?.data?.firstName || formData.firstName}
									onChange={handleChange}
									placeholder='First Name'
								/>

								{/* update firstname */}
								<button
									className='bg-greens w-10 aspect-square rounded-md grid items-center justify-center'
									onClick={UpdateFirstName}>
									<FaCheck className='text-white' />
								</button>
							</div>

							{/* last name */}
							<div className='flex items-center gap-4'>
								<input
									className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
									type='text'
									name='lastName'
									value={user?.data?.lastName || formData.lastName}
									onChange={handleChange}
									placeholder='Last Name'
								/>

								{/* update lastname */}
								<button
									className='bg-greens w-10 aspect-square rounded-md grid items-center justify-center'
									onClick={UpdateLastName}>
									<FaCheck className='text-white' />
								</button>
							</div>

							{/* phone */}
							<div className='flex items-center gap-4'>
								<input
									className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
									type='text'
									name='phone'
									value={user?.data?.phone || formData.phone}
									onChange={handleChange}
									placeholder='Phone'
								/>

								{/* update phone */}
								<button
									className='bg-greens w-10 aspect-square rounded-md grid items-center justify-center'
									onClick={UpdatePhone}>
									<FaCheck className='text-white' />
								</button>
							</div>
						</div>

						{/* button */}
						{/* <button className='w-full border border-greens bg-greens text-white font-bold text-lg font-inter rounded py-4 shadow-sm'>
							{isLoading ? <Loader /> : 'Login'}
						</button> */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default ProfilesMain;
