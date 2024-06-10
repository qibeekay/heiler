import { Link } from 'react-router-dom';

const ChattingPage = () => {
	return (
		<div className='w-full'>
			<Link to={'/chats'} className='block md:hidden'>
				back
			</Link>
			ChattingPage
		</div>
	);
};

export default ChattingPage;
