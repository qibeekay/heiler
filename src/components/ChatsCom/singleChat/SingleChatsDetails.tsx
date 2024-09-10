import { ChattingPage, NewChatPage, UsersList } from '../../../components';
import { useLocation } from 'react-router-dom';
const SingleChatsDetails = () => {
	const location = useLocation();
	const doctor = location.state?.doctor;
	const chat = location.state?.chat;
	const isNewChat = location.state?.isNewChat;

	console.log('doctor', doctor);
	console.log('chat', chat);
	return (
		<div className='font-inter text-dark w-full relative '>
			<div className='w-full fixed bottom-0 right-0 lg:w-[82%] xll:w-[85%] flex h-screen pt-[7rem]'>
				{/* users */}
				<UsersList />

				{/* chat field */}
				{isNewChat ? (
					// If a doctor is provided, it's a new chat
					<NewChatPage doctor={doctor} />
				) : (
					// If a chat is provided, it's a resumed chat
					<ChattingPage chat={chat} />
				)}
			</div>
		</div>
	);
};

export default SingleChatsDetails;
