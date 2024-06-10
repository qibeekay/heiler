import { Header, SingleChatsDetails } from '../../../components';

const SingleChatMainnav = () => {
	return (
		<div className='w-full lg:w-[82%] xll:w-[85%] bg-white'>
			<Header title='Chat' />

			{/* other details */}
			<SingleChatsDetails />
		</div>
	);
};

export default SingleChatMainnav;
