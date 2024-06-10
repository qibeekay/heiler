import { RiSearch2Line } from 'react-icons/ri';

const doctors = [
	{
		label: 'Physiotheraphy',
		img: '/physio.png',
		color: '#639AFF',
	},
	{
		label: 'Ear, Nose, Throat',
		img: '/nose.png',
		color: '#A584FF',
	},
	{
		label: 'Heart',
		img: '/heart.png',
		color: '#ff7856',
	},
	{
		label: 'Pediatrics',
		img: '/pedia.png',
		color: '#FD4444',
	},
	{
		label: 'Physician',
		img: '/physician.png',
		color: '#00c9e4',
	},
	{
		label: 'Skin',
		img: '/skin.png',
		color: '#fd44b3',
	},
	{
		label: 'Dental',
		img: '/teeth.png',
		color: '#A584FF',
	},
	{
		label: 'General Medicine',
		img: '/general.png',
		color: '#fea725',
	},
	{
		label: 'O & G',
		img: '/og.png',
		color: '#fd4444',
	},
];
const FdDoctorsCategory = () => {
	return (
		<div className='font-inter text-dark w-full pt-8 pb-[8rem] lg:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]'>
			<div>
				{/* search */}
				<div>
					<div className=' shadow-lg bg-white flex gap-2 p-4 w-full sm:w-[30rem] rounded-md'>
						{/* icons */}
						<button>
							<RiSearch2Line />
						</button>
						{/* input */}
						<input
							type='text'
							className='w-full outline-none bg-transparent h-full'
							placeholder='Search anything...'
						/>
					</div>
				</div>

				{/* results */}
				<div className='grid grid-cols-1 xs:grid-cols-2 ssm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-20 gap-y-14 w-full'>
					{doctors?.map((doctor, index) => (
						<div
							key={index}
							className='flex flex-col items-center justify-center gap-4'>
							<div
								className=' w-[7.5rem] aspect-square grid items-center justify-center rounded-lg'
								style={{ backgroundColor: doctor?.color }}>
								<img src={doctor?.img} alt={doctor?.label} />
							</div>

							<p className='font-semibold sm:text-lg lg:text-xl'>
								{doctor?.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FdDoctorsCategory;
