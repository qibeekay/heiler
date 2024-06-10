import { ChatsMainnav, SideNav } from '../../components';

const ChatsPage = () => {
	return (
		<div>
			{/* side nav */}
			<SideNav />

			{/* mainnave */}
			<div className='flex justify-end'>
				<ChatsMainnav />
			</div>
		</div>
	);
};

export default ChatsPage;
