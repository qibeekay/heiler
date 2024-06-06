import { Mainnav, SideNav } from '../../components';

const DashboardPage = () => {
	return (
		<div className=''>
			{/* sidenav */}
			<SideNav />
			{/* mainnav */}
			<div className='flex justify-end'>
				<Mainnav />
			</div>
		</div>
	);
};

export default DashboardPage;
