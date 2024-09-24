import { RiSearch2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useConverstion } from '../useConversation';
import { useEffect, useState } from 'react';
import { GetUserChat } from '../../api/chat';
import FormatTime from '../../utils/formatTime';
import Loader from '../loader/Loader';

interface RecipientData {
	mail: string;
	token: string;
	phone: string;
	firstName: string;
	lastName: string;
}

interface LastMessage {
	sender: string;
	token: string;
	recipient: string;
	timestamp: number;
	time_day: string;
	time_month: string;
	time_year: string;
	message: string;
}

interface ChatResponse {
	recipient: string;
	recipientData: RecipientData;
	lastMessage: LastMessage;
}

const UsersList = () => {
	const [usertoken, setUsertoken] = useState('');
	const [chats, setChats] = useState<ChatResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const { isActive } = useConverstion();
	// console.log(isActive);

	useEffect(() => {
		// Fetch mail from localStorage when the component mounts
		const userData = localStorage.getItem('dets');
		if (userData) {
			const userObject = JSON.parse(userData);

			setUsertoken(userObject.data.token);
		}
	}, []);

	const getUserChats = async () => {
		setIsLoading(true);
		try {
			const res = await GetUserChat(usertoken);
			setChats(res);
		} catch {
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (usertoken) {
			getUserChats();
		}
	}, [usertoken]);

	console.log(chats);
	console.log(usertoken);

	const singleMessege = (chat: ChatResponse) => {
		navigate(`/chats/${chat.recipientData.token}`, {
			state: { chat, isNewChat: false },
		});
	};

	return (
		<div
			className={`${
				isActive ? 'hidden lg:block' : 'block'
			} w-full lg:w-[70%] shadow-right-only bg-white p-4 llg:p-7 relative`}>
			{/* search and add users */}
			<div className='w-full relative bg-white'>
				<div className='flex items-center justify-between gap-10'>
					{/* add */}
					<button>
						<img src='/newchat.png' alt='' />
					</button>

					{/* input field */}
					<div className='w-full'>
						<div className=' shadow-lg bg-white flex gap-2 p-4 w-full rounded-md'>
							{/* icons */}
							<button>
								<RiSearch2Line />
							</button>
							{/* input */}
							<input
								type='text'
								className='w-full outline-none bg-transparent h-full'
								placeholder='Search anything...'
							/>
						</div>
					</div>
					{/* edit */}
					<button>Edit</button>
				</div>
			</div>

			{/* users/chat details */}
			<div className=' mt-10 overflow-y-scroll h-[76%] lg:h-[88%]'>
				{isLoading ? (
					<div className='w-full grid items-center justify-center mt-10'>
						<Loader />
					</div>
				) : (
					<div className='flex flex-col gap-5 sm:gap-4'>
						{chats?.map((chat, index) => (
							<button
								key={index}
								className='flex items-center gap-4 hover:bg-blue-gray-100 p-1 sm:p-2'
								onClick={() => {
									singleMessege(chat);
								}}>
								{/* imgae */}
								<div className='w-[3rem] md:w-[4rem]'>
									<div className=' w-[2.5rem] md:w-[3.5rem] aspect-square rounded-full overflow-hidden'>
										<img
											className='w-full h-full object-cover object-center'
											src={'/img1.png'}
											alt={chat?.recipientData?.firstName}
										/>
									</div>
								</div>
								{/* details */}
								<div className='w-full'>
									{/* name/field */}
									<div className='flex w-full justify-between'>
										<div
											className='flex items-center gap-2 md:w-[18rem] overflow-hidden whitespace-nowrap
                                            '>
											<p className='text-sm sm:text-base md:text-lg font-semibold'>
												{chat?.recipientData.firstName}{' '}
												{chat?.recipientData.lastName}
											</p>

											<p className='text-[8px] sm:text-sm bg-yellow-200 px-1 rounded-2xl'>
												doctor?.field
											</p>
										</div>
										<p className='text-[10px] sm:text-sm md:text-base text-[#707991]'>
											{FormatTime(chat?.lastMessage.timestamp)}
										</p>
									</div>
									{/* label/count */}
									<div className='flex w-full justify-between gap-4 md:mt-1 items-center'>
										<p className='text-xs sm:text-sm md:text-base text-[#707991]'>
											doctor?.label
										</p>
										<div>
											<div className='grid items-center justify-center bg-greens w-2 lg:w-2 aspect-square rounded-full'>
												<p className='text-white text-[10px] lg:text-xs'></p>
											</div>
										</div>
									</div>
								</div>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default UsersList;
