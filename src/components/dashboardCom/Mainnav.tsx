import { DashDetails, Header } from '../../components';
const Mainnav = () => {
	const getCurrentFormattedDate = () => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			day: 'numeric',
			month: 'short',
		};
		return new Date().toLocaleDateString('en-GB', options);
	};
	return (
		<div className='w-full lg:w-[82%] xll:w-[85%] bg-white'>
			{/* header */}
			<Header date={getCurrentFormattedDate()} title='Hi, Oluwadara' />

			{/* other details */}
			<DashDetails />
		</div>
	);
};

export default Mainnav;
