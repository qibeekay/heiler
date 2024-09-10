import { useEffect, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { GetSpecialty } from '../../api/doctors';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

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

interface specialty {
	id: number;
	name: string;
}

const FdDoctorsCategory = () => {
	const [usertoken, setUsertoken] = useState('');
	const [speciaties, setSpecialties] = useState<specialty[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		// Fetch mail from localStorage when the component mounts
		const userData = localStorage.getItem('dets');
		if (userData) {
			const userObject = JSON.parse(userData);

			setUsertoken(userObject.token);
		}
	}, []);

	const getAllSpecialty = async () => {
		setIsLoading(true);
		try {
			const res = await GetSpecialty('');
			setSpecialties(res);
		} catch {
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getAllSpecialty();
	}, []);

	const doctorBySpecialty = (id: number) => {
		navigate(`/find-doctor/${id}`);
	};

	return (
		<div className='font-inter text-dark w-full pt-8 pb-[8rem] lg:pb-20 py-4 px-4 sm:px-8 xl:px-[5rem]'>
			<div className=' w-full mt-[7rem]'>
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
				{isLoading ? (
					<div className='w-full grid items-center justify-center mt-10'>
						<Loader />
					</div>
				) : (
					<div className='grid grid-cols-1 xs:grid-cols-2 ssm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-14 gap-y-14 w-full'>
						{speciaties?.map((specialty, index) => (
							<div
								key={index}
								className='flex flex-col items-center justify-center gap-3'>
								<button
									className=' w-[7.5rem] aspect-square grid items-center justify-center rounded-lg bg-[#F7FFFB] shadow'
									onClick={() => {
										doctorBySpecialty(specialty?.id);
									}}>
									<img src='./doctors.png' alt={specialty?.name} />
								</button>
								<p className='font-semibold text-[#25282B]'>
									{specialty?.name}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FdDoctorsCategory;
