import { PatientRecordMain, SideNav } from '../../components';

const PatientRecordPage = () => {
	return (
		<div>
			<SideNav />

			<div className='flex justify-end'>
				<PatientRecordMain />
			</div>
		</div>
	);
};

export default PatientRecordPage;
