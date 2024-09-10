import { FormEvent, useEffect, useState } from 'react';
import Loader from '../../../components/loader/Loader';
import { VerifyMail } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const VerifyEmail = () => {
	const [mail, setMail] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		// Fetch mail from localStorage when the component mounts
		const storedMail = localStorage.getItem('emailed');
		if (storedMail) {
			setMail(storedMail);
		}
	}, []);

	const [formData, setFormData] = useState({
		mail: '',
		code: '',
	});

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		setIsLoading(true);
		e.preventDefault();

		try {
			const res = await VerifyMail({ ...formData, mail: mail });
			if (res) {
				setTimeout(() => {
					navigate('/');
				}, 1000);
			}
		} catch {
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='relative w-full font-roboto'>
			<div className='w-full relative h-screen bg-back bg-cover bg-center bg-no-repeat'>
				<div className='absolute bg-black/60 w-full h-screen top-0 left-0'></div>
				<div className='w-full h-full flex flex-col items-center justify-center'>
					{/* form */}
					<form
						onSubmit={handleSubmit}
						className='bg-white rounded-xl w-[90%] sm:w-[30rem] md:w-[31rem] py-[1rem] px-[2rem] my-[2rem] overflow-hidden relative'>
						{/* header text/images */}
						<div className='pt-4'>
							{/* image */}
							<div className='w-[12rem] mx-auto'>
								<img
									className='w-full h-full object-cover'
									src='/logo.png'
									alt=''
								/>
							</div>

							{/* header text */}
							<div className='text-center'>
								<h1 className='font-semibold text-3xl'>Verify Account</h1>
								<p className=' text-lightDark mt-2'>
									We have sent you a verification Email. Confirm your account
								</p>
							</div>
						</div>

						{/* inputs */}
						<div className='flex flex-col gap-7 my-[3.5rem]'>
							{/* email address */}
							<div>
								<input
									className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
									type='text'
									placeholder='Enter your verifcation code'
									name='code'
									value={formData.code}
									onChange={handleChange}
								/>
							</div>
						</div>

						{/* button */}
						<button className='w-full border border-greens bg-greens text-white font-bold text-lg font-inter rounded py-4 shadow-sm'>
							{isLoading ? <Loader /> : 'Verify'}
						</button>
					</form>

					{/* footer link */}
					<div className='relative z-10'>
						<p className='w-full flex flex-col xs:flex-row gap-2 md:gap-20 items-center text-[#FDFFFE]/70 text-sm sm:text-base '>
							&copy; 2024 Heiler.{' '}
							<span className='flex items-center gap-4'>
								<img src='/fireswitch.png' alt='' />
								Developed By FireSwitch Technologies
							</span>
						</p>
					</div>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
};

export default VerifyEmail;
