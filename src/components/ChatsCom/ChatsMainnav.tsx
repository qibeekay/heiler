import { ChatsDetails, Header } from '../../components';

const ChatsMainnav = () => {
	return (
		<div className='w-full lg:w-[82%] xll:w-[85%] bg-white relative'>
			<Header title='Chat' />

			{/* other details */}
			<ChatsDetails />
		</div>
	);
};

export default ChatsMainnav;
