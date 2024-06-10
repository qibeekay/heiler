import { ChattingPage, UsersList } from '../../../components';

const SingleChatsDetails = () => {
	return (
		<div className='font-inter text-dark w-full overflow-hidden mt-[7rem]'>
			<div className='w-full flex h-screen'>
				{/* users */}
				<UsersList />

				{/* chat field */}
				<ChattingPage />
			</div>
		</div>
	);
};

export default SingleChatsDetails;
