import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
	const location = useLocation();
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);

	// navigation links
	const links = [
		{
			to: '/',
			label: 'Home',
			iconDefault: '/homeL.png',
			iconHover: '/homeD.png',
			miconDefault: '/mhomeL.png',
			miconHover: '/mhomeD.png',
		},
		{
			to: '/doctor',
			label: 'Doctor',
			iconDefault: '/doctorL.png',
			iconHover: '/doctorD.png',
			miconDefault: '/mdoctorL.png',
			miconHover: '/mdoctorD.png',
		},
		{
			to: '/chat',
			label: 'Chat',
			iconDefault: '/chatL.png',
			iconHover: '/chatD.png',
			miconDefault: '/mchatL.png',
			miconHover: '/mchatD.png',
		},
		{
			to: '/wallet',
			label: 'Wallet',
			iconDefault: '/walletL.png',
			iconHover: '/walletD.png',
			miconDefault: '/mwallerL.png',
			miconHover: '/walletD.png',
		},
		// {
		// 	to: '/notifcations',
		// 	label: 'Notifications',
		// 	iconDefault: '/notifyL.png',
		// 	iconHover: '/notifyD.png',
		// },
		{
			to: '/cards',
			label: 'Cards',
			iconDefault: '/cardL.png',
			iconHover: '/cardD.png',
		},
		{
			to: '/more',
			label: 'More',
			iconDefault: '/moreL.png',
			iconHover: '/moreD.png',
			miconDefault: '/mmoreL.png',
			miconHover: '/mmoreD.png',
		},
	];

	return (
		<div className=' font-inter py-5 px-4 xl:px-10 bg-white fixed bottom-0 lg:top-0 lg:h-screen w-full lg:w-[18%] xll:w-[15%] shadow-top-only lg:shadow-right-only '>
			<div>
				{/* desktop */}
				<div className='hidden lg:block'>
					{/* logo */}
					<div className='w-[10rem]'>
						<img
							className='w-full h-full object-cover'
							src='/logo.png'
							alt=''
						/>
					</div>

					{/* links */}
					<div className='px-4 mt-14'>
						<ul className='flex flex-col gap-10 text-sm llg:text-base'>
							{links.map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										className={`flex gap-4 items-center font-bold transition duration-300 ease-in ${
											location.pathname === link.to || hoveredLink === link.to
												? 'text-greens'
												: 'text-textgray'
										}`}
										onMouseEnter={() => setHoveredLink(link.to)}
										onMouseLeave={() => setHoveredLink(null)}>
										{/* icon */}
										<div className=''>
											<img
												className=''
												src={
													location.pathname === link.to ||
													hoveredLink === link.to
														? link.iconHover
														: link.iconDefault
												}
												alt=''
											/>
										</div>
										{/* text */}
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* mobile */}
				<div className=' lg:hidden'>
					<div className=''>
						<ul className='w-full flex gap-10 items-center justify-between text-base'>
							{links
								.filter((link) => link.miconDefault)
								.map((link) => (
									<li key={link.to}>
										<Link
											to={link.to}
											className={`flex flex-col items-center font-bold transition duration-300 ease-in ${
												location.pathname === link.to || hoveredLink === link.to
													? 'text-greens'
													: 'text-textgray'
											}`}
											onMouseEnter={() => setHoveredLink(link.to)}
											onMouseLeave={() => setHoveredLink(null)}>
											{/* icon */}
											<div className=''>
												<img
													className=''
													src={
														location.pathname === link.to ||
														hoveredLink === link.to
															? link.miconHover
															: link.miconDefault
													}
													alt=''
												/>
											</div>
											{/* text - only show when active */}
											<div className='hidden xs:block'>
												<span
													className={` transition-opacity duration-300 ease-in-out ${
														location.pathname === link.to ? 'block' : 'hidden'
													}`}>
													{link.label}
												</span>
											</div>
										</Link>
									</li>
								))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
