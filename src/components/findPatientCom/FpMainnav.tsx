import { FpPatientsCategory, Header } from '../../components';

const FpMainnav = () => {
	return (
		<div className='w-full lg:w-[82%] xll:w-[85%] bg-white'>
			<Header title='Patients' />

			{/* other details */}
			<FpPatientsCategory />
		</div>
	);
};

export default FpMainnav;
