import { FdDoctorsCategory, Header } from '../../components';

const FdMainnav = () => {
	return (
		<div className='w-full lg:w-[82%] xll:w-[85%] bg-white'>
			<Header title='Find your doctors' />

			{/* other details */}
			<FdDoctorsCategory />
		</div>
	);
};

export default FdMainnav;
