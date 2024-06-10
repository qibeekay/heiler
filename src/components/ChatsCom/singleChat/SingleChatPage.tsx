import { SideNav, SingleChatMainnav } from '../../../components';

const SingleChatPage = () => {
	return (
		<div>
			{/* side nav */}
			<SideNav />

			{/* mainnave */}
			<div className='flex justify-end'>
				<SingleChatMainnav />
			</div>
		</div>
	);
};

export default SingleChatPage;
