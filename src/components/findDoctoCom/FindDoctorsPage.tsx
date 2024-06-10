import { FdMainnav, SideNav } from '../../components';

const FindDoctorsPage = () => {
	return (
		<div>
			{/* side nav */}
			<SideNav />

			{/* mainnave */}
			<div className='flex justify-end'>
				<FdMainnav />
			</div>
		</div>
	);
};

export default FindDoctorsPage;
