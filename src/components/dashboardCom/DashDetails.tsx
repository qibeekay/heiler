import { useEffect, useState } from 'react';
import { IoEyeOffSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { GetUserData } from '../../api/auth';

const DashDetails = () => {
	const [usertoken, setUsertoken] = useState('');
	const [user, setUser] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		// Fetch mail from localStorage when the component mounts
		const userData = localStorage.getItem('dets');
		if (userData) {
			const userObject = JSON.parse(userData);

			setUsertoken(userObject.data.token);
		}
	}, []);

	console.log(usertoken);
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

	return (
		<div className='w-full text-dark font-inter pt-[9.5rem] pb-[8rem] md:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]'>
			<div className='flex flex-col llg:flex-row gap-6 xl:gap-10'>
				{/* side 1 */}
				<div className='w-full'>
					{/* note header */}
					<div className=' bg-lemongreen rounded-2xl relative h-[20rem] px-4 sm:px-10 flex flex-col sm:justify-center text-left overflow-hidden'>
						{/* header text */}
						<h1 className=' text-greens sm:text-2xl xl:text-3xl font-bold flex flex-col mt-7 sm:mt-0'>
							Early Protection <span>for your family health</span>
						</h1>

						{/* paragrapg */}
						<p className='text-[#3F3F3F] text-sm sm:text-lg xl:text-xl mt-4 w-full sm:w-[45%] xl:w-[50%]'>
							Have a regular checkup to prevent any complications
						</p>

						{/* img */}
						<div className='absolute right-0 -bottom-10 sm:right-10 sm:bottom-0 -rotate-[2deg]'>
							<img
								className='w-full h-full object-cover'
								src='/img2.png'
								alt=''
							/>
						</div>
					</div>

					{/* buttoms */}
					<div className='mt-16'>
						{/* doctor */}
						<button className=' bg-greens text-white font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center border border-greens'>
							{/* img */}
							<div className=' w-[3rem] rounded-full grid items-center justify-center aspect-square bg-white'>
								<img className=' ' src='/profile-add.png' alt='' />
							</div>
							Doctor
						</button>

						{/* ambulance */}
						<button className=' bg-white text-greens font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens'>
							{/* img */}
							<div className=' w-[3rem] rounded-full grid items-center justify-center aspect-square bg-lemongreen'>
								<img className=' ' src='/hospital.png' alt='' />
							</div>
							Doctor
						</button>
					</div>

					{/* notification card */}
					<div className='mt-16'>
						<div className='bg-white shadow-lg rounded-lg'>
							{/* head */}
							<div className='flex items-center justify-between px-4 sm:px-10 py-7'>
								<p className='font-bold sm:text-xl xl:text-2xl'>
									Notifications
								</p>
								<Link to={''} className='text-greens font-medium '>
									See all
								</Link>
							</div>

							{/* notiii */}
							<div className=' border-t px-4 sm:px-10 py-7'>
								{/* info */}
								<div className='flex items-center justify-between'>
									{/* text */}
									<div>
										{/* text 1 */}
										<div className='flex gap-4'>
											{/* icon */}
											<div>
												<img src='/success.png' alt='' />
											</div>
											{/* text */}
											<p className='grid xl:text-lg font-bold'>
												Card successfully saved{' '}
												<span className='font-normal text-textgray mt-1 text-xs sm:text-base'>
													VISA 1234 has been added to your account
												</span>
											</p>
										</div>
									</div>

									{/* close */}
									<button className=''>
										<img src='/close.png' alt='' />
									</button>
								</div>

								{/* info */}
								<p className='text-center text-[#EE9621] font-semibold mt-14'>
									View Cards
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* side 2 */}
				<div className='mt-10 llg:mt-0 w-full md:w-[70%] mx-auto'>
					{/* wallet */}
					<div className='rounded-2xl bg-greens h-[13rem] text-white p-4 sm:p-10 font-roboto flex flex-col justify-center sm:block'>
						{/* balance */}
						<p className='text-lg xl:text-xl'>My Balance</p>
						{/* amount */}
						<div className='w-full flex items-center font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl justify-between text-white/80 mt-5 sm:mt-7'>
							<p>NGN 4,562.52</p>
							{/* eye */}
							<IoEyeOffSharp />
						</div>
					</div>

					{/* button */}
					<div className='flex flex-col sm:flex-row items-center gap-x-4 w-full'>
						<button className=' bg-white text-greens font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens'>
							{/* img */}
							<div className=' w-[3rem] rounded-full grid items-center justify-center aspect-square bg-lemongreen'>
								<img className=' ' src='/hospital.png' alt='' />
							</div>
							Add Money
						</button>

						<button className=' bg-greens text-white font-semibold w-full flex items-center gap-4 rounded-lg py-5 justify-center mt-6 border border-greens'>
							{/* img */}
							<div className=' w-[3rem] rounded-full grid items-center justify-center aspect-square bg-lemongreen'>
								<img className=' ' src='/hospital.png' alt='' />
							</div>
							Send Money
						</button>
					</div>

					{/* transaction history */}
					<div className='mt-16'>
						{/* head */}
						<div className='bg-white shadow-lg rounded-lg'>
							<div className='flex items-center justify-between px-4 sm:px-10 py-7'>
								<p className='font-bold sm:text-xl xl:text-2xl'>
									Transaction History
								</p>
								<Link to={''} className='text-greens font-medium '>
									See all
								</Link>
							</div>

							{/* history */}
							<div className='px-4 sm:px-10 py-10 grid gap-10'>
								{/* success */}
								<div className='flex flex-col xs:flex-row xs:items-center justify-between'>
									{/* text */}
									<div>
										{/* text 1 */}
										<div className='flex items-center gap-4'>
											{/* icon */}
											<div className=' w-[3rem] aspect-square grid items-center justify-center rounded-xl bg-lemongreen'>
												<img className='' src='/credit.png' alt='' />
											</div>
											{/* text */}
											<p className='grid xl:text-lg font-bold'>
												Wallet Top-up
												<span className='font-normal text-textgray mt-1 text-base'>
													14 Aug, 2022
												</span>
											</p>
										</div>
									</div>

									{/* amount */}
									<div className=' text-greens flex gap-2 items-center justify-end mt-2 xs:mt-0 xs:justify-center'>
										{/* image */}
										<div>
											<img src='/nairagreen.png' alt='' />
										</div>
										<p className='font-bold sm:text-lg'>10,000</p>
									</div>
								</div>

								{/* danger */}
								<div className='flex flex-col xs:flex-row xs:items-center justify-between'>
									{/* text */}
									<div>
										{/* text 1 */}
										<div className='flex items-center gap-4'>
											{/* icon */}
											<div className=' w-[3rem] aspect-square grid items-center justify-center rounded-xl bg-[#FFF5F4]'>
												<img className='' src='/debit.png' alt='' />
											</div>
											{/* text */}
											<p className='grid xl:text-lg font-bold'>
												Wallet Top-up
												<span className='font-normal text-textgray mt-1 text-base'>
													14 Aug, 2022
												</span>
											</p>
										</div>
									</div>

									{/* amount */}
									<div className=' text-[#E63E3E] flex gap-2 items-center justify-end mt-2 xs:mt-0 xs:justify-center'>
										{/* image */}
										<div>
											<img src='/nairared.png' alt='' />
										</div>
										<p className='font-bold sm:text-lg'>10,000</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashDetails;
