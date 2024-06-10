import { ChattingDisplay, UsersList } from '../../components';

const ChatsDetails = () => {
	return (
		<div className='font-inter text-dark w-full overflow-hidden'>
			<div className='w-full flex h-[calc(100svh-5rem)] lg:h-[calc(100svh-7rem)] mt-[6rem] lg:mt-[7rem]'>
				{/* users */}
				<UsersList />

				{/* chat field */}
				<ChattingDisplay />
			</div>
		</div>
	);
};

export default ChatsDetails;
