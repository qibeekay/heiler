import { FpMainnav, ProfilesMain, SideNav } from '../../components';

const ProfilesPage = () => {
	return (
		<div>
			{/* side nav */}
			<SideNav />

			{/* mainnave */}
			<div className='flex justify-end'>
				<ProfilesMain />
			</div>
		</div>
	);
};

export default ProfilesPage;
