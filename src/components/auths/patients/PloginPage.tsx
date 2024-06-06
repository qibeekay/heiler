import { useState } from 'react';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const PloginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};
	return (
		<div className='relative w-full font-roboto'>
			<div className='w-full relative h-screen bg-back bg-cover bg-center bg-no-repeat'>
				<div className='absolute bg-black/60 w-full h-screen top-0 left-0'></div>
				<div className='w-full h-full flex flex-col items-center justify-center'>
					{/* form */}
					<form className='bg-white rounded-xl w-[90%] sm:w-[30rem] md:w-[31rem] py-[1rem] px-[2rem] my-[2rem] overflow-hidden relative'>
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
								<h1 className='font-semibold text-3xl'>Welcome Back</h1>
								<p className=' text-lightDark mt-2'>
									Log in to continue to your dashboard
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
									placeholder='Email Address'
								/>
							</div>

							{/* password */}
							<div className='relative'>
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
								{/* forot passord */}
								<div className='w-full flex items-center justify-end'>
									<Link to={''} className='text-greens text-lg text-right'>
										Forgot password?
									</Link>
								</div>
							</div>
						</div>

						{/* button */}
						<button className='w-full border border-greens bg-greens text-white font-bold text-lg font-inter rounded py-4 shadow-sm'>
							Login
						</button>

						{/*  don't have an account */}
						<div className='mt-10 text-center'>
							<p className='text-[#818181]'>
								Dont have an account?{' '}
								<Link className='text-greens font-bold' to={'/patients/signup'}>
									Sign up
								</Link>
							</p>
						</div>
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
			</div>
		</div>
	);
};

export default PloginPage;
