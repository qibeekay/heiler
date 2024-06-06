import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CountrySelect, DatePicker } from '../../index';
import { Checkbox } from '@material-tailwind/react';
import {
	IoMaleSharp,
	IoFemaleSharp,
	IoEyeSharp,
	IoEyeOffSharp,
} from 'react-icons/io5';
import { HiChevronLeft } from 'react-icons/hi2';

const DsignupPage = () => {
	const [step, setStep] = useState(1);
	const [isMaleSelected, setIsMaleSelected] = useState(false);
	const [isFemaleSelected, setIsFemaleSelected] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);

	const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prevStep) => Math.min(prevStep + 1, 4));
	};

	const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prevStep) => Math.max(prevStep - 1, 1));
	};

	const handleMaleChange = () => {
		setIsMaleSelected(true);
		setIsFemaleSelected(false);
	};

	const handleFemaleChange = () => {
		setIsMaleSelected(false);
		setIsFemaleSelected(true);
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const togglePassword1Visibility = () => {
		setShowPassword1((prevState) => !prevState);
	};

	return (
		<div className='relative w-full font-roboto'>
			<div className='w-full relative h-screen bg-back bg-cover bg-center bg-no-repeat'>
				<div className='absolute bg-black/60 w-full h-screen top-0 left-0'></div>
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<form className='bg-white rounded-xl w-[90%] sm:w-[30rem] md:w-[31rem] py-[1rem] px-[2rem] my-[2rem] overflow-hidden relative'>
						{/* header text/images */}
						<div className='pt-4'>
							{/* image */}
							<div className='w-[12rem] mx-auto'>
								<img
									className='w-full h-full object-cover'
									src={step === 4 ? '/pass.png' : '/logo.png'}
									alt=''
								/>
							</div>
							{/* header text */}
							<div className='text-center'>
								<h1 className='font-semibold text-xl sm:text-3xl'>
									{step === 4 ? 'Set up your password' : 'Create an Account'}
								</h1>
								<p className=' text-sm sm:text-base text-lightDark mt-2'>
									{step === 4
										? 'Set up your password to complete registration.'
										: 'Register to have access to the Dashboard.'}
								</p>
							</div>
						</div>

						{/* inputs */}
						<div className='flex flex-col gap-7 my-[2.5rem] relative'>
							{/* first tab */}
							{/* first name, last name, email, date of birth */}
							<div
								className={`transition-transform duration-500 ease-in-out absolute inset-0 ${
									step === 1 ? 'translate-x-0' : '-translate-x-full'
								} ${step > 1 ? 'opacity-0 absolute' : 'opacity-100 relative'}`}>
								{/* first name */}
								<div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='text'
										placeholder='First name'
									/>
								</div>

								{/* last name */}
								<div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='text'
										placeholder='Last name'
									/>
								</div>

								{/* email address */}
								<div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='email'
										placeholder='Email Address'
									/>
								</div>

								{/* date picker */}
								<div>
									<DatePicker />
								</div>
							</div>

							{/* second tab */}
							{/* occupation and nationality */}
							<div
								className={`transition-transform duration-500 ease-in-out inset-0 ${
									step === 2 ? 'translate-x-0' : 'translate-x-full'
								} ${
									step === 2 ? 'opacity-100 relative' : 'opacity-0 absolute'
								}`}>
								{/* country / phone details */}
								<div className='w-full mb-4'>
									<CountrySelect />
								</div>

								{/* gender select */}
								<div className='mb-4 flex gap-2'>
									{/* male select  */}
									<label className='flex items-center gap-2 font-semibold text-xl text-dark cursor-pointer'>
										<Checkbox
											checked={isMaleSelected}
											onChange={handleMaleChange}
											label={
												<p className='flex items-center gap-2 font-semibold text-xl text-dark'>
													Male <IoMaleSharp />
												</p>
											}
											crossOrigin=''
										/>
									</label>

									{/* female select */}
									<label className='flex items-center gap-2 font-semibold text-xl text-dark cursor-pointer'>
										<Checkbox
											checked={isFemaleSelected}
											onChange={handleFemaleChange}
											label={
												<p className='flex items-center gap-2 font-semibold text-xl text-dark'>
													Female <IoFemaleSharp />
												</p>
											}
											crossOrigin=''
										/>
									</label>
								</div>

								{/* occupation */}
								<div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='text'
										placeholder='Occupation'
									/>
								</div>

								{/* home address */}
								<div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='text'
										placeholder='Home Address'
									/>
								</div>
							</div>

							{/* third tab */}
							{/* speciality and years of practices */}
							<div
								className={`transition-transform duration-500 ease-in-out inset-0 ${
									step === 3 ? 'translate-x-0' : 'translate-x-full'
								} ${
									step === 3 ? 'opacity-100 relative' : 'opacity-0 absolute'
								}`}>
								{/* speciality */}
								<div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='text'
										placeholder='Speciality'
									/>
								</div>

								{/* years of pratices */}
								<div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='text'
										placeholder='Years Pratice'
									/>
								</div>

								{/* Address/ Place / Country of Practice*/}
								<div className='mb-7'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type='text'
										placeholder='Address/ Place / Country of Practice'
									/>
								</div>
							</div>

							{/* fourth tab */}
							{/* password and confirm password */}
							<div
								className={`transition-transform duration-500 ease-in-out absolute inset-0 ${
									step === 4
										? 'translate-x-0'
										: step < 4
										? 'translate-x-full'
										: '-translate-x-full'
								} ${
									step === 4 ? 'opacity-100 relative' : 'opacity-0 absolute'
								}`}>
								{/* password */}
								<div className='mb-7 relative'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type={showPassword ? 'text' : 'password'}
										placeholder='Password'
									/>
									<button
										type='button'
										onClick={togglePasswordVisibility}
										className='absolute top-1/2 right-4 transform -translate-y-1/2 text-black/60'>
										{showPassword ? (
											<IoEyeOffSharp size={25} />
										) : (
											<IoEyeSharp size={25} />
										)}
									</button>
								</div>

								{/* confirm password */}
								<div className='mb-7 relative'>
									<input
										className='p-4 rounded-lg bg-bgGreen text-[#858585] placeholder:text-[#858585] border border-[#C2C8D0]/60 text-lg w-full outline-[#C2C8D0]'
										type={showPassword ? 'text' : 'password'}
										placeholder='Confirm Password'
									/>
									<button
										type='button'
										onClick={togglePassword1Visibility}
										className='absolute top-1/2 right-4 transform -translate-y-1/2 text-black/60'>
										{showPassword1 ? (
											<IoEyeOffSharp size={25} />
										) : (
											<IoEyeSharp size={25} />
										)}
									</button>
								</div>

								{/* terms and condition */}
								<Checkbox
									crossOrigin=''
									label={
										<p className=' font-inter font-normal text-sm text-dark'>
											I hereby accept the
											<Link
												to={''}
												className='font-bold transition-colors hover:text-greens'>
												&nbsp;terms and conditions{''}
											</Link>
											{''} of healing race
										</p>
									}
								/>
							</div>
						</div>

						{/* buttons */}
						<div className='flex flex-col gap-4'>
							{step < 4 ? (
								<button
									onClick={handleNext}
									className='w-full border border-greens bg-greens text-white font-bold text-lg font-inter rounded py-4 shadow-sm'>
									Next
								</button>
							) : (
								<button className='w-full border border-greens bg-greens text-white font-bold text-lg font-inter rounded py-4 shadow-sm'>
									Create Account
								</button>
							)}
							{step > 1 && (
								<button
									onClick={handlePrev}
									className='absolute top-4 font-semibold flex items-center gap-2'>
									<HiChevronLeft />
									Previous
								</button>
							)}
						</div>
						{/* already have an account */}
						<div className='mt-5 text-center'>
							<p className='text-[#818181]'>
								Already have an account?{' '}
								<Link className='text-greens font-bold' to='/doctors/login'>
									Log in
								</Link>
							</p>
						</div>
					</form>

					{/* footer link */}
					<div className='relative z-10'>
						<p className='w-full flex flex-col xs:flex-row gap-2 md:gap-20 items-center text-[#FDFFFE]/70 text-sm sm:text-base'>
							&copy; 2024 Heiler.{' '}
							<span className='flex items-center gap-2'>
								<img src='/fireswitch.png' alt='' />
								Developed By FireSwitch Technologies
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DsignupPage;
