import { ChattingDisplay, UsersList } from '../../components';

const ChatsDetails = () => {
	return (
		<div className='font-inter text-dark w-full relative '>
			<div className='w-full fixed bottom-0 right-0 lg:w-[82%] xll:w-[85%] flex h-screen pt-[7rem]'>
				{/* users */}
				<UsersList />

				{/* chat field */}
				<ChattingDisplay />
			</div>
		</div>
	);
};

export default ChatsDetails;
