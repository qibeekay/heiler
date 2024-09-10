import { FdDoctorBySpecialtyMain, SideNav } from '../../../components';

const FdDoctorBySpecialty = () => {
	return (
		<div>
			<SideNav />

			<div className='flex justify-end'>
				<FdDoctorBySpecialtyMain />
			</div>
		</div>
	);
};

export default FdDoctorBySpecialty;
