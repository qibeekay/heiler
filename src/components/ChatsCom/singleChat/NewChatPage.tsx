import { FaArrowLeft } from 'react-icons/fa';
import { MdInsertDriveFile } from 'react-icons/md';
import { Link } from 'react-router-dom';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from 'react';

interface Doctor {
	token: string;
	firstName: string;
	lastName: string;
	mail: string;
	timestamp: string;
}
interface Props {
	doctor: Doctor;
}

const NewChatPage = ({ doctor }: Props) => {
	const [emoji, setEmoji] = useState(false);
	console.log(doctor?.firstName);
	return (
		<div className='w-full h-full relative'>
			<div className='w-full h-full relative'>
				{/* header */}
				<div className='w-full bg-greens text-white flex items-center justify-between p-4 md:p-7'>
					{/* userprofile */}
					<div className='flex items-center gap-4'>
						<div>
							<Link to={'/chats'} className='block lg:hidden'>
								<FaArrowLeft />
							</Link>
						</div>

						{/* profile */}
						<div className='flex items-center gap-6'>
							{/* image */}
							<div className=' w-[2.5rem] md:w-[3.5rem] aspect-square rounded-full overflow-hidden'>
								<img
									className='w-full h-full object-cover object-center'
									src='/img1.png'
									alt=''
								/>
							</div>

							{/* name */}
							<div className=''>
								<p>
									Dr. {doctor?.firstName} {doctor?.lastName}
								</p>
								<p>online</p>
							</div>
						</div>
					</div>

					{/* case note */}
					<div>
						<MdInsertDriveFile size={30} />
					</div>
				</div>

				<div className=' mt-[10rem]'>
					{/* gif */}
					<div className='w-full grid items-center justify-center'>
						<img src='/chat.gif' alt='' />
					</div>

					{/* text */}
					<div className='text-center mt-[4rem]'>
						{/* paragraph */}
						<p className=''>No messages yet ...</p>

						{/* paragraph 2 */}
						<p className=' text-lg lg:text-xl font-bold'>
							Start by sending a message.
						</p>
					</div>
				</div>

				{/* input field */}
				<div className='w-full'>
					<div className='absolute bg-lemongreen py-2 px-2 sm:px-6 rounded-full flex items-center gap-2 w-[90%] xl:w-[35rem] bottom-10 left-[50%] -translate-x-[50%]'>
						{/* input */}
						<div className='bg-white w-full rounded-full p-4 flex items-center gap-4'>
							{/* emoji */}
							<div className='relative w-[3rem] grid items-center justify-center'>
								<button onClick={() => setEmoji(true)}>
									<img src='/emoji.png' alt='' />
								</button>
								<div
									className={`absolute ease-in-out duration-500 transition-all  ${
										emoji ? '-top-[30rem] -left-[15rem]' : 'top-[40rem]'
									}`}>
									<Picker data={data} />
								</div>
							</div>
							{/* input field */}
							<div className='w-full'>
								<input
									type='text'
									className=' py-1 italic bg-transparent w-full outline-none'
									placeholder='Type message...'
								/>
							</div>
							<div className='flex gap-4 items-center justify-center w-[5rem]'>
								{/* attach */}
								<div className='relative'>
									<button>
										<img src='/attach.png' alt='' />
									</button>
								</div>
								{/* camera */}
								<div className='relative'>
									<button>
										<img src='/camera.png' alt='' />
									</button>
								</div>
							</div>
						</div>

						{/* vn */}
						<div>
							<button className='bg-greens w-[2.5rem] sm:w-[4rem] aspect-square grid items-center justify-center rounded-full overflow-hidden'>
								<img className='w-[0.8rem]' src='/vn.png' alt='' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewChatPage;
